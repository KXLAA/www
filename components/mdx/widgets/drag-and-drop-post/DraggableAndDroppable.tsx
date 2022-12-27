import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

type DraggableProps = {
  id: string;
  content: React.ReactNode;
  styles?: React.CSSProperties;
};

function Draggable({ id, content, styles }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <span
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      className={cx(
        "flex items-center bg-shark-900 justify-center  h-14 w-fit p-4 text-sm font-bold rounded-lg text-silver-00 shadow-border-shiny transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-shark-800 text-silver-900"
      )}
      {...listeners}
      {...attributes}
    >
      {content}
    </span>
  );
}

type DroppableProps = {
  children: React.ReactNode;
};

function Droppable({ children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className={cx(
        "w-full rounded-lg bg-shark-900 shadow-border-shiny transition-colors h-64",
        isOver && "bg-shark-700"
      )}
    >
      {children}
      <p
        className={cx(
          "transition-colors absolute m-0 text-4xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-shark-600 -z-10",
          isOver && "text-silver-400"
        )}
      >
        DROPPABLE
      </p>
    </div>
  );
}

export default function DraggableAndDroppable() {
  const draggable = [
    {
      id: uuid(),
      content: "DRAGGABLE",
      position: {
        x: 24,
        y: 24,
      },
    },
  ];

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const [draggables, setDraggables] = React.useState([...draggable]);

  function addDraggable() {
    setDraggables([
      ...draggables,
      {
        id: uuid(),
        content: `DRAGGABLE`,
        position: {
          ...generateRandomAxis(),
        },
      },
    ]);
  }

  function resetDraggables() {
    setDraggables([...draggable]);
  }

  function handleDragEnd(ev: DragEndEvent) {
    // What to do here??
    // It's not a sortable, it's a free drag and drop
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    draggable.position.x += ev.delta.x;
    draggable.position.y += ev.delta.y;
    const _draggables = draggables.map((d) => {
      if (d.id === draggable.id) return draggable;
      return d;
    });

    setDraggables(_draggables);
  }

  return (
    <div className="relative flex flex-col justify-end w-full h-64 p-10 rounded-xl grid-bg shadow-border-shiny">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <>
          <AnimatePresence>
            {draggables.map((d) => (
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
                  content={d.content}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      </DndContext>

      <div className="flex justify-center gap-4 pt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={draggables.length <= 1}
          className={cx(
            "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
            draggables.length <= 1 &&
              "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
          )}
        >
          <Refresh onClick={resetDraggables} />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
          onClick={addDraggable}
        >
          ADD DRAGGABLE
        </motion.button>
      </div>
    </div>
  );
}

function generateRandomAxis() {
  return {
    x: Math.floor(Math.random() * 300),
    y: Math.floor(Math.random() * 300),
  };
}
