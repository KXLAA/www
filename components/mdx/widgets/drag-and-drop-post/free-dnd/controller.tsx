import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { Status, useStatus } from "@/components/mdx/widgets/common/Status";
import { uuid } from "@/lib/uuid";

const uniqueNamesConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 1,
  style: "upperCase",
};

export function useController() {
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
  const [status, setStatus] = useStatus();
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const [draggables, setDraggables] = React.useState(draggable);

  function handleAddDraggables() {
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

  function handleReset() {
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

  return {
    state: {
      draggables,
      sensors,
      status,
    },
    actions: {
      handleAddDraggables,
      handleReset,
      handelDragStart,
      handleDragEnd,
    },
  };
}
