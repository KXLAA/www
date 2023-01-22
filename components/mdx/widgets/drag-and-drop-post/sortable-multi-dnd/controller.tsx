import type {
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";

import { Status, useStatus } from "@/components/mdx/widgets/common/Status";
import { uuid } from "@/lib/uuid";

type ContainerProps = {
  id: UniqueIdentifier;
  name?: string;
  items: Item[];
  description?: string;
};

export function useController(itemCount: number) {
  const [showDragHandles, toggleShowDragHandles] = React.useReducer(
    toggleReducer,
    false
  );
  const [isDirty, setIsDirty] = React.useState(false);

  const initialItems = [
    {
      id: uuid(),
      name: "CONTAINER A",
      items: createData(itemCount, (index) => `A${index + 1}`),
    },
    {
      id: uuid(),
      name: "CONTAINER B",
      items: createData(itemCount, (index) => `B${index + 1}`),
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

  function handleReset() {
    setSortables([...initialItems]);
    setStatus(null);
    setIsDirty(false);
  }

  function handleToggleDragHandles() {
    toggleShowDragHandles();
    setStatus(
      <Status variant="gray" className="mb-7">
        Toggled drag handles
      </Status>
    );
  }

  function findContainer(id?: UniqueIdentifier) {
    if (id) {
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

  return {
    state: {
      showDragHandles,
      isDirty,
      sortables,
      status,
      sensors,
    },
    actions: {
      handleReset,
      findContainer,
      handleDragOver,
      handleDragEnd,
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
      id: uuid(),
      name: `${initializer(index)}`,
    };
  });
}

function toggleReducer(state: boolean, nextState?: boolean) {
  return nextState ?? !state;
}
