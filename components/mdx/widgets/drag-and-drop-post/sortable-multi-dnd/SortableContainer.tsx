import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cx } from "@/lib/cx";

import { OverlayItem, SortableItem } from "./SortableItem";

type Item = {
  id: UniqueIdentifier;
  name: string;
};

type SortableContainerProps = {
  id: UniqueIdentifier;
  name?: string;
  items: Item[];
  showDragHandles: boolean;
};

export function SortableContainer(props: SortableContainerProps) {
  const { name, id, showDragHandles, items } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name, type: "container" },
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
        "flex items-start bg-shark-900 gap-2 w-full rounded-md text-silver shadow-border-shiny transition-colors z-10 drop-shadow-lg"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <div
          {...listeners}
          {...attributes}
          className={cx(
            "flex items-center justify-center w-full p-2 text-2xl font-bold rounded-t-md bg-shark-800 shadow-border-shiny cursor-grab active:cursor-grabbing",
            isDragging && "opacity-10"
          )}
        >
          {name}
        </div>

        <div className="flex flex-col items-start w-full gap-2 p-4">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.length === 0 ? (
              <div
                key={id}
                className="flex items-center justify-center w-full h-20 text-2xl font-semibold rounded-md shadow-border-shiny text-silver-900"
              >
                EMPTY
              </div>
            ) : null}
            {items.map((s) => (
              <SortableItem
                {...s}
                key={s.id}
                showDragHandles={showDragHandles}
                isDraggingContainer={isDragging}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}

export function OverlayContainer(props: SortableContainerProps) {
  const { name, id, showDragHandles, items } = props;

  return (
    <div
      className={cx(
        "flex items-start bg-shark-900 min-h-full  gap-2 w-full rounded-md text-silver shadow-border-shiny transition-colors z-10 drop-shadow-lg"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2 ">
        <div
          className={cx(
            "flex items-center justify-center w-full p-2 text-2xl font-bold rounded-t-md bg-shark-800 shadow-border-shiny cursor-grabbing"
          )}
        >
          {name}
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
          {items.length === 0 ? (
            <div
              key={id}
              className="flex items-center justify-center w-full h-20 text-2xl font-semibold rounded-md shadow-border-shiny text-silver-900"
            >
              EMPTY
            </div>
          ) : null}
          {items.map((s) => (
            <OverlayItem {...s} key={s.id} showDragHandles={showDragHandles} />
          ))}
        </div>
      </div>
    </div>
  );
}
