/* eslint-disable react-hooks/exhaustive-deps */
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
import { motion } from "framer-motion";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea, useStatus } from "@/components/mdx/widgets/common/LiveArea";
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

type FreeDndProps = {
  hideFooter?: boolean;
  hideStatus?: boolean;
  itemCount?: number;
};

export default function DroppableDnd(props: FreeDndProps) {
  const { hideFooter, hideStatus, itemCount = 5 } = props;
  const draggables = generateItems(itemCount);
  const [items, setItems] = React.useState<Item[]>([]);
  const [activeItem, setActiveItem] = React.useState<Item | undefined>(
    undefined
  );
  const [status, setStatus] = useStatus();

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  //Fix SSR issues
  React.useEffect(() => setItems(draggables), []);

  return (
    <LiveArea
      className="items-center justify-center gap-16"
      status={hideStatus ? undefined : status}
      footer={
        hideFooter ? null : (
          <div className="flex justify-center gap-4 p-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!status}
              onClick={resetDraggables}
              className={cx(
                "z-10 flex items-center justify-center w-8 h-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
                !status &&
                  "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
              )}
            >
              <Refresh />
            </motion.button>
          </div>
        )
      }
    >
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
        <Droppable id="root" className="mb-7">
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
    </LiveArea>
  );

  function handelDragStart(ev: DragStartEvent) {
    const { active } = ev;

    if (active) {
      setStatus(
        <p className="m-0 mb-8 text-base font-semibold">
          <span className="text-green-500">Drag start</span>{" "}
          {activeItem && ` : ${activeItem?.name}`}
        </p>
      );
      setActiveItem(items.find((i) => i.id === active.id));
    }
  }

  function handleDragOver(ev: DragOverEvent) {
    const { over } = ev;

    if (over && over.id !== activeItem?.parent) {
      setStatus(
        <p className="m-0 mb-8 text-base font-semibold">
          <span className="text-yellow-500">Drag over</span>{" "}
          {activeItem && ` : ${activeItem?.name}`}
        </p>
      );
    }
  }

  function handleDragCancel() {
    setStatus(
      <p className="m-0 mb-8 text-base font-semibold">
        <span className="text-red-500">Drag cancel</span>{" "}
        {activeItem && ` : ${activeItem?.name}`}
      </p>
    );
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

    setStatus(
      <p className="m-0 mb-8 text-base font-semibold">
        <span className="m-0 text-orange-500 ">Drag end</span>{" "}
        {activeItem && ` : ${activeItem?.name}`}
      </p>
    );
    setActiveItem(undefined);
  }

  function resetDraggables() {
    setItems(draggables);
    setStatus(undefined);
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
