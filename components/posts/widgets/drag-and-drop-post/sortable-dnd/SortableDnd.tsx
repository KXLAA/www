import type { UniqueIdentifier } from "@dnd-kit/core";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical } from "lucide-react";

import { Refresh } from "@/components/common/Refresh";
import { PostWidgetArea } from "@/components/posts/PostWidgetArea";
import { cx } from "@/lib/cx";

import { useSortableDnd } from "./controller";

type SortableDndProps = {
  itemCount?: number;
};

export default function SortableDnd(props: SortableDndProps) {
  const { itemCount = 4 } = props;
  const { state, actions } = useSortableDnd(itemCount);

  return (
    <PostWidgetArea
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800"
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
    </PostWidgetArea>
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
        "flex items-center bg-shark-800  gap-1 w-full p-3 rounded-md text-silver h-16 transition-colors z-10 drop-shadow-lg",
        isDragging && "bg-shark-600 shadow-border-shiny",
        !showDragHandles && "cursor-grab active:cursor-grabbing"
      )}
      {...(showDragHandles ? {} : listeners)}
      {...(showDragHandles ? {} : attributes)}
    >
      <div className="flex items-center justify-center gap-2 text-2xl font-black">
        <AnimatePresence>
          {showDragHandles && (
            <motion.div
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showDragHandles ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <GripVertical
                className={cx(
                  "w-6 h-6 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none text-silver-800"
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
