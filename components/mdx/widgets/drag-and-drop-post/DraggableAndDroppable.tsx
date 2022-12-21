import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { cx } from "@/lib/cx";
//Generate Uniq Id
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomPosition() {
  return {
    x: Math.floor(Math.random() * 300),
    y: Math.floor(Math.random() * 300),
  };
}

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
        "flex items-center bg-shark-500 justify-center w-32 h-14 p-4 text-sm font-bold rounded-lg text-silver-00 shiny-border-md transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-shark-500 text-silver-700"
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
        "w-full  rounded-xl mix-blend-lighten backdrop-blur bg-shark-900 shiny-border-md transition-colors h-64",
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
  const notesData = [
    {
      id: uuid(),
      content: "DRAGGABLE",
      position: {
        x: 24,
        y: 24,
      },
    },
  ];

  const [notes, setNotes] = React.useState(notesData);

  function addNewNote() {
    setNotes([
      ...notes,
      {
        id: uuid(),
        content: "DRAGGABLE",
        position: {
          ...randomPosition(),
        },
      },
    ]);
  }

  function resetNotes() {
    setNotes(notesData);

    // setNotes(notes.slice(0, -1));
  }

  function handleDragEnd(ev: DragEndEvent) {
    // What to do here??
    // It's not a sortable, it's a free drag and drop
    const note = notes.find((x) => x.id === ev.active.id)!;
    note.position.x += ev.delta.x;
    note.position.y += ev.delta.y;
    const _notes = notes.map((x) => {
      if (x.id === note.id) return note;
      return x;
    });
    setNotes(_notes);
  }

  return (
    <div className="relative w-full p-10 rounded-lg shadow-lg shiny-border polka">
      <DndContext onDragEnd={handleDragEnd}>
        <Droppable>
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring" }}
                key={note.id}
                className="z-20"
              >
                <Draggable
                  styles={{
                    position: "absolute",
                    left: `${note.position.x}px`,
                    top: `${note.position.y}px`,
                  }}
                  key={note.id}
                  id={note.id}
                  content={note.content}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Droppable>
      </DndContext>

      <div className="flex justify-center gap-4 pt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shiny-border hover:bg-shark-800"
        >
          <Refresh onClick={resetNotes} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shiny-border text-silver-600 hover:bg-shark-800"
          onClick={addNewNote}
        >
          ADD DRAGGBALE
        </motion.button>
      </div>
    </div>
  );
}
