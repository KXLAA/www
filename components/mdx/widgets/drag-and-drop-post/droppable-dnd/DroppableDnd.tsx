import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { cx } from "@/lib/cx";

import { useController } from "./controller";

export default function DroppableDnd() {
  const { state, actions } = useController();

  return (
    <LiveArea
      className="w-full"
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            onClick={actions.handleReset}
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 h-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
              state.disabled &&
                "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
            )}
          >
            <Refresh />
          </motion.button>
        </div>
      }
    >
      <DndContext
        sensors={state.sensors}
        onDragOver={actions.handleDragOver}
        onDragStart={actions.handelDragStart}
      >
        <div className="flex flex-col items-center justify-center w-full gap-10">
          <div className="flex w-full gap-2">
            {state.containers.map((id) => (
              <Droppable key={id} id={id} className="flex-wrap">
                {state.draggables
                  .filter((draggable) => draggable.containerId === id)
                  .map((draggable) => (
                    <Draggable key={draggable.id} {...draggable} border />
                  ))}
              </Droppable>
            ))}
          </div>
          <Droppable
            id="root"
            className="flex items-center justify-center w-full h-16 gap-4"
            plain
          >
            {state.draggables
              .filter((draggable) => draggable.containerId === "root")
              .map((draggable) => (
                <Draggable key={draggable.id} {...draggable} />
              ))}
          </Droppable>
        </div>
        <DragOverlay>
          {state.activeItem && (
            <div className="z-10 flex items-center justify-center w-16 h-16 gap-1 p-3 text-2xl font-black transition-colors rounded-md bg-shark-800 aspect-square text-silver cursor-grab active:cursor-grabbing drop-shadow-lg">
              {state.activeItem.name}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </LiveArea>
  );
}

type DroppableProps = {
  id: UniqueIdentifier;
  children?: React.ReactNode;
  className?: string;
  plain?: boolean;
};

function Droppable(props: DroppableProps) {
  const { children, id, className, plain } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cx(
        plain
          ? ""
          : "flex  bg-shark-800 p-2 w-full max-w-xs h-44 gap-2 items-center justify-center z-10 rounded-md",
        !plain && isOver && "bg-shark-700",
        className
      )}
    >
      {children}
    </div>
  );
}

type DraggableProps = {
  id: string;
  name?: string;
  border?: boolean;
};

export function Draggable(props: DraggableProps) {
  const { id, name, border } = props;
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
      style={{ ...style }}
      className={cx(
        "flex items-center bg-shark-800 justify-center gap-1 w-16  h-16 aspect-square p-3 rounded-md text-silver transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "opacity-0 text-silver-900 font-black",
        border && "shadow-border-shiny"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-2xl font-black"> {name}</span>
    </div>
  );
}
