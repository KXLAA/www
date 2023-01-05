import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { Status, useStatus } from "@/components/mdx/widgets/common/Status";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

const uniqueNamesConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 1,
  style: "upperCase",
};

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
        "flex items-center bg-shark-800 justify-center gap-1 w-12 h-12 aspect-square p-3 rounded-md text-silver shadow-border-shiny transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-shark-700 text-silver-900 font-black"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-base font-black"> {name}</span>
    </div>
  );
}

const draggable = [
  {
    id: uuid(),
    name: "OL",
    position: {
      x: 24,
      y: 24,
    },
  },
];

type FreeDndProps = {
  hideFooter?: boolean;
  hideStatus?: boolean;
};

export default function FreeDnd(props: FreeDndProps) {
  const { hideFooter, hideStatus } = props;
  const [status, setStatus] = useStatus();
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const [draggables, setDraggables] = React.useState([...draggable]);

  return (
    <LiveArea
      status={hideStatus ? undefined : status}
      footer={
        hideFooter ? null : (
          <div className="flex justify-center gap-4 p-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={resetDraggables}
              className={cx(
                "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
                draggables.length <= 1 &&
                  "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
              )}
            >
              <Refresh />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
              onClick={addDraggable}
            >
              ADD
            </motion.button>
          </div>
        )
      }
    >
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handelDragStart}
        sensors={sensors}
      >
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
                name={d.name}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </DndContext>
    </LiveArea>
  );

  function addDraggable() {
    const newDraggable = {
      id: uuid(),
      name: uniqueNamesGenerator(uniqueNamesConfig).slice(0, 2),
      position: {
        ...generateRandomAxis(),
      },
    };

    setDraggables([...draggables, newDraggable]);
    setStatus(
      <Status variant="green">
        <span className="font-bold">ADD</span> new draggable:{" "}
        <span className="font-bold">{newDraggable.name}</span>
      </Status>
    );
  }

  function resetDraggables() {
    setDraggables(draggable);
    setStatus(undefined);
  }

  function handelDragStart(ev: DragStartEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    setStatus(
      <Status variant="yellow">
        <span className="font-bold">DRAGGING</span> draggable:{" "}
        <span className="font-bold">{draggable.name}</span>
      </Status>
    );
  }

  function handleDragEnd(ev: DragEndEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    draggable.position.x += ev.delta.x;
    draggable.position.y += ev.delta.y;

    setStatus(
      <Status variant="orange">
        <span className="font-bold">DRAGGED</span> draggable:{" "}
        <span className="font-bold">{draggable.name}</span> to{" "}
        <span className="font-bold">x: {draggable.position.x}</span> and{" "}
        <span className="font-bold">y: {draggable.position.y}</span>
      </Status>
    );

    const _draggables = draggables.map((d) =>
      d.id === draggable.id ? draggable : d
    );

    setDraggables(_draggables);
  }

  function generateRandomAxis() {
    return {
      x: Math.floor(Math.random() * 300),
      y: Math.floor(Math.random() * 300),
    };
  }
}
