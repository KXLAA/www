import type {
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  closestCorners,
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
import { motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { Status, useStatus } from "@/components/mdx/widgets/common/Status";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

type Item = {
  id: UniqueIdentifier;
  name: string;
};

export default function DroppableDnd() {
  const [disabled, setDisabled] = React.useState(true);
  const [items, setItems] = React.useState<Items>({
    A: createData(2, (index) => `A${index + 1}`),
    B: createData(2, (index) => `B${index + 1}`),
  });
  const [status, setStatus] = useStatus();
  const [activeItem, setActiveItem] = React.useState<Item | undefined>(
    undefined
  );

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  return (
    <LiveArea
      className="w-full"
      status={status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            onClick={onReset}
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 h-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
              disabled &&
                "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
            )}
          >
            <Refresh />
          </motion.button>
        </div>
      }
    >
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragStart={handelDragStart}
        collisionDetection={closestCorners}
      >
        <div className="flex flex-col items-center w-full gap-10">
          {Object.entries(items).map(([key, value]) => (
            <Droppable key={key} id={key}>
              {value.map((item) => (
                <Draggable key={item.id} id={item.id} name={item.name} />
              ))}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </LiveArea>
  );

  function handelDragStart(ev: DragStartEvent) {
    const { active } = ev;
    const activeId = active.id;
    const activeContainer = findContainer(activeId);
    if (activeContainer) {
      const activeItem = items[activeContainer].find(
        (item) => item.id === activeId
      ) as Item;
      setActiveItem(activeItem);
    } else {
      setActiveItem(undefined);
    }
  }

  function handleDragOver(ev: DragOverEvent) {
    const { active, over } = ev;
    const activeId = active.id;
    const overId = over?.id;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId!);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((items) => {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const activeItem = activeItems.find((item) => item.id === activeId);

      const result = {
        ...items,
        [activeContainer]: activeItems.filter((item) => item.id !== activeId),
        [overContainer]: [...overItems, activeItem],
      } as Items;

      return result;
    });

    setStatus(
      <Status variant="orange" className="mb-6">
        <span className="font-bold">DRAGGED</span>{" "}
        <span className="font-bold">{activeItem?.name}</span> from container:{" "}
        <span className="font-bold">{activeContainer}</span> to container:{" "}
        <span className="font-bold">{overContainer}</span>
      </Status>
    );

    setDisabled(false);
  }

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => {
      return items[key].some((item) => item.id === id);
    });
  }

  function onReset() {
    setItems({
      A: createData(2, (index) => `A${index + 1}`),
      B: createData(2, (index) => `B${index + 1}`),
    });
    setDisabled(true);
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
        "flex  bg-shark-800 p-2 w-full max-w-xs h-[52px] gap-2 items-start justify-start z-10 rounded-md shadow-border-shiny-2",
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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
        "flex items-center bg-shark-800 justify-center gap-1 w-[70px] p-1.5 rounded-md text-silver shadow-border-shiny transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-base !font-black"> {name}</span>
    </div>
  );
}

type Items = Record<UniqueIdentifier, ReturnType<typeof createData>>;
function createData(length: number, initializer: (index: number) => string) {
  return [...new Array(length)].map((_, index) => {
    return {
      id: uuid(),
      name: `${initializer(index)}`,
    };
  });
}
