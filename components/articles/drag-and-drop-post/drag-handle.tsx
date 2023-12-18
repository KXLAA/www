import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical } from "lucide-react";

import { cx } from "@/lib/cx";

interface DragHandleProps {
  showDragHandles: boolean;
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}

export function DragHandle({
  showDragHandles,
  listeners,
  attributes,
}: DragHandleProps) {
  return (
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
              "w-5 h-5 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none text-gray-10"
            )}
            {...listeners}
            {...attributes}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
