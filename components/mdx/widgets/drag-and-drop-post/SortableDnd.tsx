import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { Status, useStatus } from "@/components/mdx/widgets/common/Status";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

type SortableDndProps = {
  itemCount?: number;
};

export default function SortableDnd(props: SortableDndProps) {
  const { itemCount = 3 } = props;
  const [showDragHandles, toggleShowDragHandles] = React.useReducer(
    toggleReducer,
    false
  );
  const [sortables, setSortables] = React.useState<Item[]>(
    createData(itemCount, (index) => `SORTABLE ${index + 1}`)
  );
  const [status, setStatus] = useStatus();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <LiveArea
      status={status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800"
            )}
            onClick={onReset}
          >
            <Refresh />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
            onClick={toggleDragHandles}
          >
            TOGGLE DRAG HANDLES
          </motion.button>
        </div>
      }
    >
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortables}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-2">
              {sortables.map((s) => (
                <SortableItem
                  {...s}
                  key={s.id}
                  showDragHandles={showDragHandles}
                />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </LiveArea>
  );

  function onReset() {
    setSortables(createData(itemCount, (index) => `A${index + 1}`));
    setStatus(null);
  }

  function toggleDragHandles() {
    toggleShowDragHandles();
    setStatus(
      <Status variant="gray" className="mb-7">
        Toggled drag handles
      </Status>
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
          <Status variant="orange" className="mb-7">
            <span className="font-bold">DRAGGED</span>{" "}
            <span className="font-bold">{activeItem?.name}</span> from index:{" "}
            <span className="font-bold">{oldIndex}</span> to index:{" "}
            <span className="font-bold">{newIndex}</span>
          </Status>
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
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
        "flex items-start bg-shark-800  gap-1 w-full p-3 rounded-md text-silver shadow-border-shiny transition-colors z-10 drop-shadow-lg",
        isDragging && "bg-shark-600",
        !showDragHandles && "cursor-grab active:cursor-grabbing"
      )}
      {...(showDragHandles ? {} : listeners)}
      {...(showDragHandles ? {} : attributes)}
    >
      <div className="text-base !font-black flex items-center justify-start gap-2">
        <AnimatePresence>
          {showDragHandles && (
            <motion.div
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showDragHandles ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <DragHandleDots2Icon
                className={cx(
                  "w-5 h-5 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none text-silver-800"
                )}
                {...listeners}
                {...attributes}
              />
            </motion.div>
          )}
        </AnimatePresence>

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

type Item = {
  id: UniqueIdentifier;
  name: string;
};

function createData(length: number, initializer: (index: number) => string) {
  return [...new Array(length)].map((_, index) => {
    return {
      id: uuid(),
      name: `${initializer(index)}`,
    };
  });
}

function toggleReducer(state: boolean, nextState?: boolean) {
  return nextState ?? !state;
}
