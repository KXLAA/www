import type { UniqueIdentifier } from "@dnd-kit/core";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { cx } from "@/lib/cx";

import { useController } from "./controller";

type SortableDndProps = {
  itemCount?: number;
};

type Item = {
  id: UniqueIdentifier;
  name: string;
};

export default function SortableMultiDnd(props: SortableDndProps) {
  const { itemCount = 3 } = props;
  const { actions, state } = useController(itemCount);

  return (
    <LiveArea
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
              !state.isDirty &&
                "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
            )}
            onClick={actions.handleReset}
          >
            <Refresh />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
            onClick={actions.handleToggleDragHandles}
          >
            TOGGLE DRAG HANDLES
          </motion.button>
        </div>
      }
    >
      <DndContext
        collisionDetection={closestCorners}
        sensors={state.sensors}
        onDragEnd={actions.handleDragEnd}
        onDragOver={actions.handleDragOver}
      >
        <SortableContext
          items={state.sortables}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex items-start justify-center w-full min-h-full gap-4">
            {state.sortables.map((s) => (
              <SortableContainer
                key={s.id}
                id={s.id}
                name={s.name}
                items={s.items}
                showDragHandles={state.showDragHandles}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </LiveArea>
  );
}

type SortableContainerProps = {
  id: UniqueIdentifier;
  name?: string;
  items: Item[];
  showDragHandles: boolean;
};

function SortableContainer(props: SortableContainerProps) {
  const { name, id, showDragHandles, items } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name, type: "container" },
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
        "flex items-start bg-shark-900 min-h-full  gap-2 w-full rounded-md text-silver shadow-border-shiny transition-colors z-10 drop-shadow-lg"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2 ">
        <div
          {...listeners}
          {...attributes}
          className={cx(
            "flex items-center justify-center w-full p-2 text-2xl font-bold rounded-t-md bg-shark-800 shadow-border-shiny cursor-grab active:cursor-grabbing",
            isDragging && "bg-shark-600"
          )}
        >
          {name}
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
          {items.length === 0 ? (
            <div
              key={id}
              className="flex items-center justify-center w-full h-20 text-2xl font-semibold rounded-md shadow-border-shiny text-silver-900"
            >
              EMPTY
            </div>
          ) : (
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((s) => (
                <SortableItem
                  {...s}
                  key={s.id}
                  showDragHandles={showDragHandles}
                />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </div>
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
    data: { name, type: "item" },
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
        "flex items-center bg-shark-800  gap-1 w-full p-3 rounded-md text-silver  transition-colors z-10 drop-shadow-lg h-16 ",
        isDragging && "bg-shark-600",
        !showDragHandles && "cursor-grab active:cursor-grabbing"
      )}
      {...(showDragHandles ? {} : listeners)}
      {...(showDragHandles ? {} : attributes)}
    >
      <div className="flex items-center justify-start gap-2 text-2xl font-black">
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
