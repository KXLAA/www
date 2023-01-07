import type {
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { Status, useStatus } from "@/components/mdx/widgets/common/Status";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

type SortableDndProps = {
  itemCount?: number;
};

type ContainerProps = {
  id: UniqueIdentifier;
  name?: string;
  items: Item[];
  description?: string;
};

export default function SortableMultiDnd(props: SortableDndProps) {
  const { itemCount = 3 } = props;
  const [showDragHandles, toggleShowDragHandles] = React.useReducer(
    toggleReducer,
    false
  );
  const [isDirty, setIsDirty] = React.useState(false);

  const initialItems = [
    {
      id: uuid(),
      name: "Container A",
      items: createData(itemCount, (index) => `A${index + 1}`),
    },
    {
      id: uuid(),
      name: "Container B",
      items: createData(itemCount, (index) => `B${index + 1}`),
    },
    {
      id: uuid(),
      name: "Container C",
      items: createData(itemCount, (index) => `C${index + 1}`),
    },
  ];

  const [sortables, setSortables] = React.useState<ContainerProps[]>([
    ...initialItems,
  ]);

  const [status, setStatus] = useStatus();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <LiveArea
      status={status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
              !isDirty &&
                "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
            )}
            onClick={onReset}
          >
            <Refresh />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
            onClick={toggleDragHandles}
          >
            TOGGLE DRAG HANDLES
          </motion.button>
        </div>
      }
    >
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext
          items={sortables}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex items-start justify-center w-full min-h-full gap-4">
            {sortables.map((s) => (
              <SortableContainer
                key={s.id}
                id={s.id}
                name={s.name}
                items={s.items}
                showDragHandles={showDragHandles}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </LiveArea>
  );

  function onReset() {
    setSortables([...initialItems]);
    setStatus(null);
    setIsDirty(false);
  }

  function toggleDragHandles() {
    toggleShowDragHandles();
    setStatus(
      <Status variant="gray" className="mb-7">
        Toggled drag handles
      </Status>
    );
  }

  function findContainer(id?: UniqueIdentifier) {
    if (id) {
      if (sortables.map((s) => s.id).includes(id)) return id;

      //If id is a child item return the parent id
      const container = sortables?.find((i) =>
        i.items?.find((l) => l?.id === id)
      );

      return container?.id;
    }
  }

  function isSortingContainers(
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier
  ) {
    return (
      sortables.map((s) => s.id).includes(overId) &&
      sortables.map((s) => s.id).includes(activeId)
    );
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;
    if (!activeId || !overId) return;
    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (!overContainerId || !activeContainerId) return;
    if (isSortingContainers(activeId, overId)) return;

    if (activeContainerId !== overContainerId) {
      const activeContainer = sortables.find((i) => i.id === activeContainerId);
      const overContainer = sortables.find((i) => i.id === overContainerId);
      const activeItems = activeContainer?.items || [];
      const activeIndex = activeItems.findIndex((i) => i.id === active.id);
      const overItems = overContainer?.items || [];
      const overIndex = sortables.findIndex((i) => i.id === over.id);
      let newIndex: number;
      if (sortables.map((s) => s.id).includes(over.id as string)) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const newItems = sortables.map((item) =>
        // Remove the active item from the old list
        item.id === activeContainerId
          ? {
              ...item,
              items: activeItems.filter((item) => item.id !== active.id),
            }
          : // Add the active item to the new list
          item.id === overContainerId
          ? {
              ...item,
              items: [
                ...item.items.slice(0, newIndex),
                activeItems[activeIndex],
                ...overItems.slice(newIndex, item.items.length),
              ],
            }
          : item
      );

      setSortables(newItems);
      setIsDirty(true);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;
    if (!activeId || !overId) return;
    const activeContainerId = findContainer(activeId);

    if (isSortingContainers(activeId, overId)) {
      if (active.id !== over.id) {
        setSortables((items) => {
          const oldIndex = sortables.findIndex((f) => f.id === activeId);
          const newIndex = sortables.findIndex((f) => f.id === overId);
          const activeItem = sortables.find((f) => f.id === activeId);

          setStatus(
            <Status variant="orange" className="mb-7">
              <span className="font-bold">DRAGGED</span>{" "}
              <span className="font-bold">{activeItem?.name}</span> from index:{" "}
              <span className="font-bold">{oldIndex}</span> to index:{" "}
              <span className="font-bold">{newIndex}</span>
            </Status>
          );
          setIsDirty(true);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    } else {
      const activeContainer = sortables.find((i) => i.id === activeContainerId);
      const activeItems = activeContainer?.items || [];
      const oldIndex = activeItems.findIndex((i) => i.id === activeId);
      const newIndex = activeItems.findIndex((i) => i.id === overId);
      const newItems = sortables.map((s) =>
        s.id === activeContainerId
          ? {
              ...s,
              items: arrayMove(s.items, oldIndex, newIndex),
            }
          : s
      );

      if (oldIndex !== newIndex) {
        setSortables(newItems);
        setIsDirty(true);
      }
    }
  }
}

type SortableContainerProps = {
  id: UniqueIdentifier;
  name?: string;
  items: Item[];
  showDragHandles: boolean;
};

function SortableContainer(props: SortableContainerProps) {
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
        "flex items-start bg-shark-800 min-h-full  gap-2 w-full p-2 rounded-md text-silver shadow-border-shiny transition-colors z-10 drop-shadow-lg",
        isDragging && "bg-shark-600"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <div
          {...listeners}
          {...attributes}
          className="flex items-center justify-center w-full h-6 p-2 text-sm font-bold rounded-md bg-shark-600 shadow-border-shiny cursor-grab active:cursor-grabbing"
        >
          {name}
        </div>

        {items.length === 0 ? (
          <Droppable
            id={id}
            key={id}
            className="flex items-center justify-center w-full h-20 text-xs font-semibold rounded-md shadow-border-shiny text-silver-900"
          >
            List is empty
          </Droppable>
        ) : (
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((s) => (
              <SortableItem
                {...s}
                key={s.id}
                showDragHandles={showDragHandles}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}

type SortableItemProps = {
  id: UniqueIdentifier;
  name?: string;
  showDragHandles: boolean;
};

function SortableItem(props: SortableItemProps) {
  const { name, id, showDragHandles } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name, type: "item" },
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
        "flex items-start bg-shark-800  gap-1 w-full p-3 rounded-md text-silver shadow-border-shiny transition-colors z-10 drop-shadow-lg",
        isDragging && "bg-shark-600",
        !showDragHandles && "cursor-grab active:cursor-grabbing"
      )}
      {...(showDragHandles ? {} : listeners)}
      {...(showDragHandles ? {} : attributes)}
    >
      <div className="text-base !font-black flex items-center justify-start gap-2">
        <AnimatePresence>
          {showDragHandles && (
            <motion.div
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showDragHandles ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <DragHandleDots2Icon
                className={cx(
                  "w-5 h-5 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none text-silver-800"
                )}
                {...listeners}
                {...attributes}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          initial={{ x: showDragHandles ? 0 : 4 }}
          animate={{ x: showDragHandles ? 0 : 4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {name}
        </motion.span>
      </div>
    </div>
  );
}

type DroppableProps = {
  id: UniqueIdentifier;
  children?: React.ReactNode;
  className?: string;
};

export function Droppable(props: DroppableProps) {
  const { id, children, className } = props;
  console.log("Droppable", id);

  const { setNodeRef } = useDroppable({
    id,
    data: { type: "container" },
  });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

type Item = {
  id: UniqueIdentifier;
  name: string;
};

function createData(length: number, initializer: (index: number) => string) {
  return [...new Array(length)].map((_, index) => {
    return {
      id: uuid(),
      name: `${initializer(index)}`,
    };
  });
}

function toggleReducer(state: boolean, nextState?: boolean) {
  return nextState ?? !state;
}
