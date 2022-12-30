import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { Refresh } from "@/components/common/Refresh";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

const uniqueNamesConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 1,
  style: "upperCase",
};

type Item = {
  id: UniqueIdentifier;
  parent: UniqueIdentifier;
  name: string;
};

const draggables = generateItems(5);

export default function DndContextEvents() {
  const [items, setItems] = React.useState<Item[]>(draggables);
  const [activeItem, setActiveItem] = React.useState<Item | undefined>(
    undefined
  );
  const [event, setEvent] = React.useState<
    | {
        message: string;
        color: string;
      }
    | undefined
  >(undefined);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  React.useEffect(() => {
    if (event) {
      const timer = setTimeout(() => {
        setEvent(undefined);
      }, 7000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.message, event?.color]);

  return (
    <div className="relative flex flex-col justify-end w-full p-4 rounded-xl bg-shark-800">
      <div className="relative flex flex-col justify-center items-center gap-20 w-full p-4 rounded-xl  border border-[#1F1F22] live-area bg-shark-900">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handelDragStart}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          sensors={sensors}
        >
          <Droppable id="droppable">
            {items.map((i) => {
              if (i.parent === "droppable") {
                return <Draggable key={i.id} id={i.id} name={i.name} />;
              }
            })}
          </Droppable>
          <Droppable id="root" className="mb-16">
            {items.map((i) => {
              if (i.parent === "root") {
                return <Draggable key={i.id} id={i.id} name={i.name} />;
              }
            })}
          </Droppable>
          <DragOverlay>
            {activeItem && (
              <div
                className={cx(
                  "flex items-center bg-shark-800 justify-center gap-1 w-12 h-12 rounded-md text-silver shadow-border-shiny transition-colors cursor-grabbing z-10 drop-shadow-lg aspect-square font-black opacity-50"
                )}
              >
                <span className="text-base"> {activeItem.name}</span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      <AnimatePresence>
        {event && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring" }}
            className="absolute bottom-8 left-0 flex items-center justify-between w-full p-6 text-xs text-silver-400 mix-blend-lighten backdrop-blur border-t-2 border-[#1F1F22]"
          >
            <p className="text-base font-semibold">
              <span className={cx(event.color)}>{event.message}</span>{" "}
              {activeItem && ` : ${activeItem?.name}`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-4 pt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!event}
          onClick={resetDraggables}
          className={cx(
            "z-10 flex items-center justify-center w-8 h-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
            !event &&
              "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
          )}
        >
          <Refresh />
        </motion.button>
      </div>
    </div>
  );

  function handelDragStart(ev: DragStartEvent) {
    const { active } = ev;

    if (active) {
      setEvent({
        message: "Drag start",
        color: "text-green-500",
      });
      setActiveItem(items.find((i) => i.id === active.id));
    }
  }

  function handleDragOver(ev: DragOverEvent) {
    const { over } = ev;

    if (over && over.id !== activeItem?.parent) {
      setEvent({
        message: "Drag over",
        color: "text-yellow-500",
      });
    }
  }

  function handleDragCancel() {
    setEvent({
      message: "Drag cancel",
      color: "text-red-500",
    });
    setActiveItem(undefined);
  }

  function handleDragEnd(ev: DragEndEvent) {
    const { over } = ev;
    const activeId = ev.active.id;

    if (over) {
      setItems((prev) => {
        return prev.map((i) =>
          i.id === activeId ? { ...i, parent: over.id } : i
        );
      });
    }

    setEvent({
      message: "Drag end",
      color: "text-orange-500",
    });
    setActiveItem(undefined);
  }

  function resetDraggables() {
    setItems(draggables);
    setEvent(undefined);
  }
}

type DroppableProps = {
  id: UniqueIdentifier;
  children?: React.ReactNode;
  className?: string;
};

function Droppable(props: DroppableProps) {
  const { children, id, className } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cx(
        "h-16 flex gap-4 rounded-xl bg-shark-800 shadow-border-shiny p-2 w-80 z-10",
        isOver && "bg-shark-700",
        className
      )}
    >
      {children}
    </div>
  );
}

type DraggableProps = {
  id: UniqueIdentifier;
  styles?: React.CSSProperties;
  name?: string;
};

function Draggable(props: DraggableProps) {
  const { id, styles, name } = props;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      className={cx(
        "flex items-center bg-shark-800 justify-center gap-1 w-12 h-12 rounded-md text-silver shadow-border-shiny transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg aspect-square",
        isDragging && "opacity-20"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-base !font-black"> {name}</span>
    </div>
  );
}

function generateItems(count: number): Item[] {
  return Array.from({ length: count }, () => {
    return {
      id: uuid(),
      parent: "root",
      name: uniqueNamesGenerator(uniqueNamesConfig).slice(0, 2),
    };
  });
}
