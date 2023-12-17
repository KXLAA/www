"use client";

import type {
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
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
import { CSS } from "@dnd-kit/utilities";
import { nanoid } from "nanoid";
import React from "react";

import { RefreshButton } from "@/components/articles/drag-and-drop-post/refresh-button";
import { WidgetArea } from "@/components/articles/widget-area";
import {
  usePostWidgetStatus,
  WidgetStatus,
} from "@/components/articles/widget-status";
import { cx } from "@/lib/cx";
import { useIsMobile } from "@/lib/responsive";

export default function DroppableDnd() {
  const { state, actions } = useDroppableDnd();

  return (
    <WidgetArea
      className="w-full"
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <RefreshButton onClick={actions.handleReset} />
        </div>
      }
    >
      <DndContext
        sensors={state.sensors}
        onDragOver={actions.handleDragOver}
        onDragStart={actions.handelDragStart}
      >
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <div className="flex items-center justify-center w-full gap-2">
            {state.containers.map((id) => (
              <Droppable key={id} id={id} className="flex-wrap">
                {state.draggables
                  .filter((draggable) => draggable.containerId === id)
                  .map((draggable) => (
                    <Draggable key={draggable.id} {...draggable} />
                  ))}
              </Droppable>
            ))}
          </div>

          <Droppable
            id="ROOT"
            className="flex flex-wrap items-center justify-center w-full h-16 gap-4"
            plain
          >
            {state.draggables
              .filter((draggable) => draggable.containerId === "ROOT")
              .map((draggable) => (
                <Draggable key={draggable.id} {...draggable} />
              ))}
          </Droppable>
        </div>
      </DndContext>
    </WidgetArea>
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
          : "flex  bg-gray-2 p-2 w-44 max-w-xs h-44 gap-2 items-center justify-center z-10 border border-gray-6",
        !plain && isOver && "bg-gray-3",
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
        "flex items-center bg-gray-1 border-gray-5 border justify-center gap-1 w-16  h-16 aspect-square p-3  transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-gray-2 text-gray-11"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-2xl font-black"> {name}</span>
    </div>
  );
}

const initialState = createData(4, (index) => randomLetter() + `${index + 1}`);

function useDroppableDnd() {
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
      <WidgetStatus variant="orange" className="mb-6">
        <span className="font-bold">DRAGGED</span>{" "}
        <span className="font-bold">{activeItem?.name}</span> to container:{" "}
        <span className="font-bold">{overId.toUpperCase()}</span>
      </WidgetStatus>
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
      id: nanoid(),
      name: `${initializer(index)}`,
      containerId: "ROOT",
    };
  });
}
