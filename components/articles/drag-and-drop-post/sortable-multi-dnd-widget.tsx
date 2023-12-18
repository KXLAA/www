"use client";

import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  closestCenter,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { nanoid } from "nanoid";
import React from "react";

import { RefreshButton } from "@/components/articles/drag-and-drop-post/refresh-button";
import { cx } from "@/lib/cx";
import { useIsMobile } from "@/lib/responsive";

import { WidgetArea } from "../widget-area";
import { usePostWidgetStatus, WidgetStatus } from "../widget-status";
import { DragHandle } from "./drag-handle";

type SortableDndProps = {
  itemCount?: number;
};

export default function SortableMultiDnd(props: SortableDndProps) {
  const { itemCount = 3 } = props;
  const { actions, state } = useSortableMultiDnd(itemCount);

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
            onClick={actions.handleToggleDragHandles}
          >
            TOGGLE DRAG HANDLES
          </motion.button>
        </div>
      }
    >
      <DndContext
        sensors={state.sensors}
        onDragEnd={actions.handleDragEnd}
        onDragOver={actions.handleDragOver}
        onDragStart={actions.handleDragStart}
        collisionDetection={state.collisionDetection}
      >
        <SortableContext
          items={state.sortables.map((s) => s.id)}
          strategy={state.strategy}
        >
          <div
            className={cx(
              "flex justify-center w-full min-h-full gap-4",
              state.isMobile && "flex-col"
            )}
          >
            {state.sortables.map((s) => (
              <SortableContainer
                {...s}
                key={s.id}
                showDragHandles={state.showDragHandles}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {state.activeItem ? (
            <>
              {state.containerIds.includes(state.activeItem.id) ? (
                <OverlayContainer
                  {...(state.activeItem as ContainerProps)}
                  showDragHandles={state.showDragHandles}
                />
              ) : (
                <OverlayItem
                  {...(state.activeItem as Item)}
                  showDragHandles={state.showDragHandles}
                />
              )}
            </>
          ) : null}
        </DragOverlay>
      </DndContext>
    </WidgetArea>
  );
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
        "flex items-start bg-gray-2 gap-2 w-full text-gray-11 border border-gray-5 transition-colors z-10 drop-shadow-lg"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <div
          {...listeners}
          {...attributes}
          className={cx(
            "flex items-center justify-center w-full p-2 text-xl font-bold rounded-t-md bg-gray-1 border-b border-gray-5 cursor-grab active:cursor-grabbing",
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
                className="flex items-center justify-center bg-gray-1 w-full h-40 text-xl font-semibold  border border-gray-5"
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

function OverlayContainer(props: SortableContainerProps) {
  const { name, id, showDragHandles, items } = props;

  return (
    <div
      className={cx(
        "flex items-start bg-gray-2 border border-gray-6 min-h-full  gap-2 w-full transition-colors z-10 drop-shadow-lg"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2 ">
        <div
          className={cx(
            "flex items-center justify-center w-full p-2 text-xl font-bold rounded-t-md bg-gray-1 border-b border-gray-5 cursor-grabbing"
          )}
        >
          {name}
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
          {items.length === 0 ? (
            <div
              key={id}
              className="flex items-center justify-center w-full h-20 text-xl font-semibold border-gray-5 border text-gray-11"
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

type SortableItemProps = {
  id: UniqueIdentifier;
  name?: string;
  showDragHandles: boolean;
  isDraggingContainer?: boolean;
};

function SortableItem(props: SortableItemProps) {
  const { name, id, showDragHandles, isDraggingContainer } = props;
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
        "flex items-center bg-gray-1  gap-1 w-full p-2 text-gray-11 transition-colors z-10 drop-shadow-lg border border-gray-5",
        isDragging && "opacity-10",
        isDraggingContainer && "opacity-10",
        !showDragHandles && "cursor-grab active:cursor-grabbing"
      )}
      {...(showDragHandles ? {} : listeners)}
      {...(showDragHandles ? {} : attributes)}
    >
      <div className="flex items-center justify-start gap-2 text-xl font-black">
        <DragHandle
          showDragHandles={showDragHandles}
          listeners={listeners}
          attributes={attributes}
        />

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

type OverlayItemProps = {
  showDragHandles?: boolean;
  name: string;
};

function OverlayItem(props: OverlayItemProps) {
  const { showDragHandles, name } = props;
  return (
    <div
      className={cx(
        "flex items-center bg-gray-1 text-gray-11 gap-1 w-full p-2 transition-colors z-10 drop-shadow-lg cursor-grabbing",
        "border border-gray-5"
      )}
    >
      <div className="flex items-center justify-start gap-2 text-xl font-black">
        <AnimatePresence>
          {showDragHandles && (
            <div>
              <GripVertical
                className={cx(
                  "w-5 h-5 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none text-gray-10"
                )}
              />
            </div>
          )}
        </AnimatePresence>

        <span>{name}</span>
      </div>
    </div>
  );
}

type ContainerProps = {
  id: UniqueIdentifier;
  name?: string;
  items: Item[];
  description?: string;
};

function useSortableMultiDnd(itemCount: number) {
  const [showDragHandles, toggleShowDragHandles] = React.useReducer(
    toggleReducer,
    false
  );
  const [activeItem, setActiveItem] = React.useState<
    ContainerProps | Item | null
  >(null);
  const [isDirty, setIsDirty] = React.useState(false);
  const isMobile = useIsMobile();

  const initialItems = [
    {
      id: "A",
      name: "CONTAINER A",
      items: createData(itemCount, (index) => `A${index + 1}`),
    },
    {
      id: "B",
      name: "CONTAINER B",
      items: createData(itemCount, (index) => `B${index + 1}`),
    },
  ];

  const [sortables, setSortables] = React.useState<ContainerProps[]>([
    ...initialItems,
  ]);

  const [status, setStatus] = usePostWidgetStatus();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleReset() {
    setSortables([...initialItems]);
    setStatus(null);
    setIsDirty(false);
  }

  function handleToggleDragHandles() {
    toggleShowDragHandles();
    setStatus(
      <WidgetStatus variant="gray" className="mb-7">
        Toggled drag handles
      </WidgetStatus>
    );
  }

  const containerIds = sortables.map((s) => s.id);

  function findContainer(id?: UniqueIdentifier) {
    if (id) {
      if (containerIds.includes(id)) return id;
      const container = sortables?.find((i) =>
        i.items?.find((l) => l?.id === id)
      );

      return container?.id;
    }
  }

  function isSortingContainers({
    activeId,
    overId,
  }: {
    activeId: UniqueIdentifier;
    overId: UniqueIdentifier;
  }) {
    const isActiveContainer = containerIds.includes(activeId);
    const isOverContainer = findContainer(overId);
    return !!isActiveContainer && !!isOverContainer;
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeId = active.id;

    if (containerIds.includes(activeId)) {
      const container = sortables.find((i) => i.id === activeId);
      if (container) setActiveItem(container);
    } else {
      const containerId = findContainer(activeId);
      const container = sortables.find((i) => i.id === containerId);
      const item = container?.items.find((i) => i.id === activeId);
      if (item) setActiveItem(item);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const activeId = active.id;
    const overId = over.id;
    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (!overContainerId || !activeContainerId) return;

    if (isSortingContainers({ activeId, overId })) return;

    if (activeContainerId !== overContainerId) {
      const activeContainer = sortables.find((i) => i.id === activeContainerId);
      const overContainer = sortables.find((i) => i.id === overContainerId);
      const activeItems = activeContainer?.items || [];
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overItems = overContainer?.items || [];
      const overIndex = sortables.findIndex((i) => i.id === overId);
      let newIndex: number;
      if (containerIds.includes(overId)) {
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
      setStatus(
        <WidgetStatus variant="yellow" className="mb-7">
          <span className="font-bold">DRAGGED</span>{" "}
          <span className="font-bold">{activeItem?.name}</span> from
          <span className="font-bold"> {activeContainer?.name}</span> from to{" "}
          <span className="font-bold">{overContainer?.name}</span>
        </WidgetStatus>
      );
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const activeId = active.id;
    const overId = over.id;
    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (isSortingContainers({ activeId, overId })) {
      if (activeId !== overId) {
        setSortables((items) => {
          const oldIndex = sortables.findIndex(
            (f) => f.id === activeContainerId
          );
          const newIndex = sortables.findIndex((f) => f.id === overContainerId);
          const activeItem = sortables.find((f) => f.id === activeContainerId);

          setStatus(
            <WidgetStatus variant="orange" className="mb-7">
              <span className="font-bold">DRAGGED</span>{" "}
              <span className="font-bold">{activeItem?.name}</span> from index:{" "}
              <span className="font-bold">{oldIndex}</span> to index:{" "}
              <span className="font-bold">{newIndex}</span>
            </WidgetStatus>
          );
          setIsDirty(true);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }

    if (activeContainerId === overContainerId) {
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

  return {
    state: {
      showDragHandles,
      isDirty,
      sortables,
      status,
      sensors,
      activeItem,
      containerIds,
      strategy: isMobile
        ? verticalListSortingStrategy
        : horizontalListSortingStrategy,
      isMobile,
      collisionDetection: isMobile ? closestCorners : closestCenter,
    },
    actions: {
      handleReset,
      findContainer,
      handleDragOver,
      handleDragEnd,
      handleDragStart,
      handleToggleDragHandles,
    },
  };
}

type Item = {
  id: UniqueIdentifier;
  name: string;
};

function createData(length: number, initializer: (index: number) => string) {
  return [...new Array(length)].map((_, index) => {
    return {
      id: nanoid(),
      name: `${initializer(index)}`,
    };
  });
}

function toggleReducer(state: boolean, nextState?: boolean) {
  return nextState ?? !state;
}
