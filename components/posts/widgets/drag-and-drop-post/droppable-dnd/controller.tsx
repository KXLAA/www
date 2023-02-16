import type {
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";

import {
  PostWidgetStatus,
  usePostWidgetStatus,
} from "@/components/posts/PostWidgetStatus";
import { useIsMobile } from "@/lib/hooks/responsive";
import { uuid } from "@/lib/uuid";

export function useDroppableDnd() {
  const initialState = createData(
    4,
    (index) => randomLetter() + `${index + 1}`
  );
  const [disabled, setDisabled] = React.useState(true);
  const [containers] = React.useState(["A", "B"]);
  const [draggables, setDraggables] = React.useState([...initialState]);
  const [status, setStatus] = usePostWidgetStatus();
  const [activeItem, setActiveItem] = React.useState<Item | undefined>(
    undefined
  );
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  function handelDragStart(ev: DragStartEvent) {
    const { active } = ev;
    const activeId = active.id;
    const activeItem = draggables.find((item) => item.id === activeId);
    setActiveItem(activeItem);
  }

  function handleDragOver(ev: DragOverEvent) {
    const { active, over } = ev;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id as string;

    setDraggables((prev) => {
      return prev.map((item) => {
        if (item.id === activeId) {
          return {
            ...item,
            containerId: overId,
          };
        }
        return item;
      });
    });

    setStatus(
      <PostWidgetStatus variant="orange" className="mb-6">
        <span className="font-bold">DRAGGED</span>{" "}
        <span className="font-bold">{activeItem?.name}</span> to container:{" "}
        <span className="font-bold">{overId.toUpperCase()}</span>
      </PostWidgetStatus>
    );

    setDisabled(false);
  }

  function handleReset() {
    setDraggables([...initialState]);
    setDisabled(true);
    setStatus(undefined);
  }

  return {
    state: {
      draggables: draggables.slice(isMobile ? 2 : undefined),
      containers: containers.slice(isMobile ? 1 : undefined),
      disabled,
      status,
      activeItem,
      sensors,
      isMobile,
    },
    actions: {
      handleReset,
      handleDragOver,
      handelDragStart,
    },
  };
}

type Item = {
  id: UniqueIdentifier;
  name: string;
};

//random letter from A-Z
function randomLetter() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase();
}

function createData(length: number, initializer: (index: number) => string) {
  return [...new Array(length)].map((_, index) => {
    return {
      id: uuid(),
      name: `${initializer(index)}`,
      containerId: "ROOT",
    };
  });
}
