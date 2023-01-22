import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { cx } from "@/lib/cx";

import { useController } from "./controller";

type FreeDndProps = {
  hideFooter?: boolean;
  hideStatus?: boolean;
};

export default function FreeDnd(props: FreeDndProps) {
  const { hideFooter, hideStatus } = props;
  const { actions, state } = useController();

  return (
    <LiveArea
      status={hideStatus ? undefined : state.status}
      footer={
        hideFooter ? null : (
          <div className="flex justify-center gap-4 p-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={actions.handleReset}
              className={cx(
                "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
                state.draggables.length <= 1 &&
                  "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
              )}
            >
              <Refresh />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
              onClick={actions.handleAddDraggables}
            >
              ADD
            </motion.button>
          </div>
        )
      }
    >
      <DndContext
        onDragEnd={actions.handleDragEnd}
        onDragStart={actions.handelDragStart}
        sensors={state.sensors}
      >
        <AnimatePresence>
          {state.draggables.map((d) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring" }}
              key={d.id}
              className="z-20"
            >
              <Draggable
                styles={{
                  position: "absolute",
                  left: `${d.position.x}px`,
                  top: `${d.position.y}px`,
                }}
                key={d.id}
                id={d.id}
                name={d.name}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </DndContext>
    </LiveArea>
  );
}

type DraggableProps = {
  id: string;
  styles?: React.CSSProperties;
  name?: string;
};

function Draggable(props: DraggableProps) {
  const { id, styles, name } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      className={cx(
        "flex items-center bg-shark-800 justify-center gap-1 w-16  h-16 aspect-square p-3 rounded-md text-silver transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-shark-700 text-silver-900 font-black"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-base text-2xl font-black"> {name}</span>
    </div>
  );
}
