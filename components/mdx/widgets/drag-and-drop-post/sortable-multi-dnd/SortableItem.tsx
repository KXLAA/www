import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import React from "react";

import { cx } from "@/lib/cx";

type SortableItemProps = {
  id: UniqueIdentifier;
  name?: string;
  showDragHandles: boolean;
  isDraggingContainer?: boolean;
};

export function SortableItem(props: SortableItemProps) {
  const { name, id, showDragHandles, isDraggingContainer } = props;
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
        isDragging && "opacity-10",
        isDraggingContainer && "opacity-10",
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
              <GripVertical
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

type OverlayItemProps = {
  showDragHandles?: boolean;
  name: string;
};
export function OverlayItem(props: OverlayItemProps) {
  const { showDragHandles, name } = props;
  return (
    <div
      className={cx(
        "flex items-center bg-shark-800  gap-1 w-full p-3 rounded-md text-silver  transition-colors z-10 drop-shadow-lg h-16 cursor-grabbing"
      )}
    >
      <div className="flex items-center justify-start gap-2 text-2xl font-black">
        <AnimatePresence>
          {showDragHandles && (
            <div>
              <GripVertical
                className={cx(
                  "w-5 h-5 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none text-silver-800"
                )}
              />
            </div>
          )}
        </AnimatePresence>

        <span>{name}</span>
      </div>
    </div>
  );
}
