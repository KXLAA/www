"use client";

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
import { nanoid } from "nanoid";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { RefreshButton } from "@/components/articles/drag-and-drop-post/refresh-button";
import { cx } from "@/lib/cx";

import { WidgetArea } from "../widget-area";
import { usePostWidgetStatus, WidgetStatus } from "../widget-status";

export default function FreeDnd() {
  const { actions, state } = useFreeDnd();

  return (
    <WidgetArea
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <RefreshButton onClick={actions.handleReset} />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex px-4 items-center justify-center  gap-2 text-sm transition-colors font-bold  bg-gray-1 border border-gray-5"
            )}
            onClick={actions.handleAddDraggables}
          >
            ADD
          </motion.button>
        </div>
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
    </WidgetArea>
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
    ...styles,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className={cx(
        "flex items-center bg-gray-1 justify-center gap-1 w-16 text-gray-11 border border-gray-6  h-16 aspect-square p-3 transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-gray-2 text-gray-12 font-black"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-2xl font-black"> {name}</span>
    </div>
  );
}

const uniqueNamesConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 1,
  style: "upperCase",
};

const draggable = [
  {
    id: nanoid(),
    name: "KA",
    position: { x: 24, y: 24 },
  },
];

function generateRandomAxis() {
  return {
    x: Math.floor(Math.random() * 300),
    y: Math.floor(Math.random() * 300),
  };
}

function useFreeDnd() {
  const [status, setStatus] = usePostWidgetStatus();
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const [draggables, setDraggables] = React.useState(draggable);

  function handleAddDraggables() {
    const newDraggable = {
      id: nanoid(),
      name: uniqueNamesGenerator(uniqueNamesConfig).slice(0, 2),
      position: { ...generateRandomAxis() },
    };

    setDraggables((draggable) => [...draggable, newDraggable]);
    setStatus(
      <WidgetStatus variant="green">
        <span className="font-bold">ADD</span> new draggable:{" "}
        <span className="font-bold">{newDraggable.name}</span>
      </WidgetStatus>
    );
  }

  function handleReset() {
    setDraggables(draggable);
    setStatus(undefined);
  }

  function handelDragStart(ev: DragStartEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    setStatus(
      <WidgetStatus variant="yellow">
        <span className="font-bold">DRAGGING</span> draggable:{" "}
        <span className="font-bold">{draggable.name}</span>
      </WidgetStatus>
    );
  }

  function handleDragEnd(ev: DragEndEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    draggable.position.x += ev.delta.x;
    draggable.position.y += ev.delta.y;

    setStatus(
      <WidgetStatus variant="orange">
        <span className="font-bold">DRAGGED</span> draggable:{" "}
        <span className="font-bold">{draggable.name}</span> to{" "}
        <span className="font-bold">x: {draggable.position.x}</span> and{" "}
        <span className="font-bold">y: {draggable.position.y}</span>
      </WidgetStatus>
    );

    const _draggables = draggables.map((d) =>
      d.id === draggable.id ? draggable : d
    );

    setDraggables(_draggables);
  }

  return {
    state: { draggables, sensors, status },
    actions: {
      handleAddDraggables,
      handleReset,
      handelDragStart,
      handleDragEnd,
    },
  };
}
