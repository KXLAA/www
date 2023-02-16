import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";

import {
  PostWidgetStatus,
  usePostWidgetStatus,
} from "@/components/posts/PostWidgetStatus";
import { uuid } from "@/lib/uuid";

export function useSortableDnd(itemCount: number) {
  const [showDragHandles, toggleShowDragHandles] = React.useReducer(
    toggleReducer,
    false
  );
  const [sortables, setSortables] = React.useState<Item[]>(
    createData(itemCount, (index) => `SORTABLE ${index + 1}`)
  );
  const [status, setStatus] = usePostWidgetStatus();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleReset() {
    setSortables(createData(itemCount, (index) => `A${index + 1}`));
    setStatus(null);
  }

  function handleToggleDragHandles() {
    toggleShowDragHandles();
    setStatus(
      <PostWidgetStatus variant="gray" className="mb-7">
        Toggled drag handles
      </PostWidgetStatus>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;

    if (activeId && overId && active.id !== over.id) {
      setSortables((items) => {
        const oldIndex = sortables.findIndex((f) => f.id === activeId);
        const newIndex = sortables.findIndex((f) => f.id === overId);
        const activeItem = sortables.find((f) => f.id === activeId);

        setStatus(
          <PostWidgetStatus variant="orange" className="mb-7">
            <span className="font-bold">DRAGGED</span>{" "}
            <span className="font-bold">{activeItem?.name}</span> from index:{" "}
            <span className="font-bold">{oldIndex}</span> to index:{" "}
            <span className="font-bold">{newIndex}</span>
          </PostWidgetStatus>
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return {
    actions: {
      handleReset,
      handleToggleDragHandles,
      handleDragEnd,
    },
    state: {
      showDragHandles,
      sortables,
      status,
      sensors,
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
