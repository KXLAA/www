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
  name: string;
};

type FreeDndProps = {
  hideFooter?: boolean;
  hideStatus?: boolean;
  itemCount?: number;
};

export default function DroppableDndMulti(props: FreeDndProps) {
  const { hideFooter, hideStatus, itemCount = 4 } = props;
  const [items, setItems] = React.useState<Items>({});
  const [activeItem, setActiveItem] = React.useState<Item | undefined>(
    undefined
  );

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  //Fix SSR issues
  React.useEffect(
    () =>
      setItems({
        A: createData(0),
        B: createData(0),
        ROOT: createData(itemCount),
      }),
    []
  );

  return (
    <LiveArea className="items-center justify-center gap-10">
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragMove={handelDragStart}
      >
        <div className="flex gap-2">
          {Object.entries(items).map(
            ([key, value]) =>
              key !== "ROOT" && (
                <Droppable key={key} id={key}>
                  {value.map((item) => (
                    <Draggable key={item.id} id={item.id} name={item.name} />
                  ))}
                </Droppable>
              )
          )}
        </div>

        {Object.entries(items).map(
          ([key, value]) =>
            key === "ROOT" && (
              <Droppable key={key} id={key} root>
                {value.map((item) => (
                  <Draggable key={item.id} id={item.id} name={item.name} />
                ))}
              </Droppable>
            )
        )}
        {/* <DragOverlay>
          {activeItem && (
            <div
              className={cx(
                "flex items-center bg-shark-800 justify-center gap-1 w-12 h-12 rounded-md text-silver shadow-border-shiny transition-colors cursor-grabbing z-10 drop-shadow-lg aspect-square font-black opacity-50"
              )}
            >
              <span className="text-base"> {activeItem.name}</span>
            </div>
          )}
        </DragOverlay> */}
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
  }

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => {
      return items[key].some((item) => item.id === id);
    });
  }
}

type DroppableProps = {
  id: UniqueIdentifier;
  children?: React.ReactNode;
  className?: string;
  root?: boolean;
};

function Droppable(props: DroppableProps) {
  const { children, id, className, root } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cx(
        "h-16 flex gap-4 rounded-xl bg-shark-800 shadow-border-shiny p-2 z-10",
        isOver && "bg-shark-700",
        root
          ? "w-[264px]"
          : "w-32 h-32 flex-wrap gap-2 items-center justify-center",
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

type Items = Record<UniqueIdentifier, ReturnType<typeof createData>>;

//create fake data
function createData(length: number) {
  return [...new Array(length)].map(() => {
    return {
      id: uuid(),
      name: uniqueNamesGenerator(uniqueNamesConfig).slice(0, 2),
    };
  });
}
