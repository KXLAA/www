/* eslint-disable react-hooks/exhaustive-deps */
import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { LiveArea, useStatus } from "@/components/mdx/widgets/common/LiveArea";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

type SortableDndProps = {
  itemCount?: number;
};

export default function SortableDnd(props: SortableDndProps) {
  const { itemCount = 4 } = props;
  const items = generateItems(itemCount);
  const [sortables, setSortables] = React.useState<Item[]>([]);
  const [status] = useStatus();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  React.useEffect(() => setSortables(items), []);

  return (
    <LiveArea status={status}>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortables}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-2">
              {sortables.map((s) => (
                <SortableItem key={s.id} {...s} />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </LiveArea>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;

    if (activeId && overId && active.id !== over.id) {
      setSortables((items) => {
        const oldIndex = sortables.findIndex((f) => f.id === activeId);
        const newIndex = sortables.findIndex((f) => f.id === overId);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

type SortableItemProps = {
  id: UniqueIdentifier;
  name?: string;
};

function SortableItem(props: SortableItemProps) {
  const { name, id } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className={cx(
        "flex items-center bg-shark-800 justify-center gap-1 w-full p-3 rounded-md text-silver shadow-border-shiny transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "opacity-20"
      )}
      {...listeners}
      {...attributes}
    >
      <span className="text-base !font-black"> {name}</span>
    </div>
  );
}

type Item = {
  id: UniqueIdentifier;
  name: string;
};

const uniqueNamesConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 1,
  style: "upperCase",
};

function generateItems(count: number): Item[] {
  return Array.from({ length: count }, () => {
    return {
      id: uuid(),
      name: uniqueNamesGenerator(uniqueNamesConfig),
    };
  });
}
