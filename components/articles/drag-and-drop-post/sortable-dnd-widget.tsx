"use client";

import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React from "react";

import { RefreshButton } from "@/components/articles/drag-and-drop-post/refresh-button";
import { WidgetArea } from "@/components/articles/widget-area";
import {
  usePostWidgetStatus,
  WidgetStatus,
} from "@/components/articles/widget-status";
import { cx } from "@/lib/cx";

import { DragHandle } from "./drag-handle";

type SortableDndProps = {
  itemCount?: number;
};

export default function SortableDnd(props: SortableDndProps) {
  const { itemCount = 4 } = props;
  const { state, actions } = useSortableDnd(itemCount);

  return (
    <WidgetArea
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <RefreshButton onClick={actions.handleReset} />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex px-4 items-center justify-center  gap-2 text-sm transition-colors font-bold  bg-gray-1 border border-gray-5"
            )}
            onClick={actions.handleToggleDragHandles}
          >
            TOGGLE DRAG HANDLES
          </motion.button>
        </div>
      }
    >
      <DndContext
        collisionDetection={closestCenter}
        sensors={state.sensors}
        onDragEnd={actions.handleDragEnd}
      >
        <SortableContext
          items={state.sortables}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-2">
              {state.sortables.map((s) => (
                <SortableItem
                  {...s}
                  key={s.id}
                  showDragHandles={state.showDragHandles}
                />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </WidgetArea>
  );
}

type SortableItemProps = {
  id: UniqueIdentifier;
  name?: string;
  showDragHandles: boolean;
};

function SortableItem(props: SortableItemProps) {
  const { name, id, showDragHandles } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className={cx(
        "flex items-center bg-gray-1  gap-1 w-full p-2 font-bold text-gray-11  transition-colors z-10 drop-shadow-lg border border-gray-5",
        isDragging && "bg-gray-2 text-gray-12",
        !showDragHandles && "cursor-grab active:cursor-grabbing"
      )}
      {...(showDragHandles ? {} : listeners)}
      {...(showDragHandles ? {} : attributes)}
    >
      <div className="flex items-center justify-center gap-2 text-xl">
        <DragHandle
          showDragHandles={showDragHandles}
          listeners={listeners}
          attributes={attributes}
        />

        <motion.span
          initial={{ x: showDragHandles ? 0 : 4 }}
          animate={{ x: showDragHandles ? 0 : 4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {name}
        </motion.span>
      </div>
    </div>
  );
}

function useSortableDnd(itemCount: number) {
  const [showDragHandles, toggleShowDragHandles] = React.useReducer(
    toggleReducer,
    false
  );
  const [sortables, setSortables] = React.useState<Item[]>(
    createData(itemCount, (index) => `SORTABLE ${index + 1}`)
  );
  const [status, setStatus] = usePostWidgetStatus();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleReset() {
    setSortables(createData(itemCount, (index) => `A${index + 1}`));
    setStatus(null);
  }

  function handleToggleDragHandles() {
    toggleShowDragHandles();
    setStatus(
      <WidgetStatus variant="gray" className="mb-7">
        Toggled drag handles
      </WidgetStatus>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;

    if (activeId && overId && active.id !== over.id) {
      setSortables((items) => {
        const oldIndex = sortables.findIndex((f) => f.id === activeId);
        const newIndex = sortables.findIndex((f) => f.id === overId);
        const activeItem = sortables.find((f) => f.id === activeId);

        setStatus(
          <WidgetStatus variant="orange" className="mb-7">
            <span className="font-bold">DRAGGED</span>{" "}
            <span className="font-bold">{activeItem?.name}</span> from index:{" "}
            <span className="font-bold">{oldIndex}</span> to index:{" "}
            <span className="font-bold">{newIndex}</span>
          </WidgetStatus>
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return {
    actions: {
      handleReset,
      handleToggleDragHandles,
      handleDragEnd,
    },
    state: {
      showDragHandles,
      sortables,
      status,
      sensors,
    },
  };
}

type Item = {
  id: UniqueIdentifier;
  name: string;
};

function createData(length: number, initializer: (index: number) => string) {
  return [...new Array(length)].map((_, index) => {
    return {
      id: nanoid(),
      name: `${initializer(index)}`,
    };
  });
}

function toggleReducer(state: boolean, nextState?: boolean) {
  return nextState ?? !state;
}
