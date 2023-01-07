import Sandpack, { styles } from "@/components/mdx/widgets/common/Sandpack";

const files = {
  "SortableItem.tsx": `import { CSS } from "@dnd-kit/utilities";
  import { useSortable } from "@dnd-kit/sortable";
  import { DragHandleDots2Icon } from "@radix-ui/react-icons";
  
  type SortableItemProps = {
    id: string;
    name?: string;
  };
  
  export function SortableItem(props: SortableItemProps) {
    const { name, id } = props;
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
      id: id
    });
  
    const style = {
      transform: CSS.Translate.toString(transform),
      transition
    };
  
    return (
      <div
        ref={setNodeRef}
        style={{ ...style }}
        className={\`sortable-item \${isDragging ? "sortable-item-active" : ""}\`}
      >
        <DragHandleDots2Icon
          className="drag-handle"
          {...listeners}
          {...attributes}
        />
        <span>{name}</span>
      </div>
    );
  }
  `,
  "items.ts": `import { nanoid } from "nanoid";

  export const items = [
    {
      id: nanoid(),
      name: "GOLD"
    },
    {
      id: nanoid(),
      name: "BRONZE"
    },
    {
      id: nanoid(),
      name: "APRICOT"
    },
    {
      id: nanoid(),
      name: "BEIGE"
    }
  ];
  
  export type Item = {
    id: string;
    name: string;
  };
  `,
  "App.tsx": `import type { DragEndEvent } from "@dnd-kit/core";
  import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
  import React from "react";
  import { items } from "./items";
  import { SortableItem } from "./SortableItem";
  
  export default function App() {
    const [sortables, setSortables] = React.useState(items);
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );
  
    return (
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sortables} strategy={verticalListSortingStrategy}>
          <div className="app">
            {sortables.map((s) => (
              <SortableItem key={s.id} {...s} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
  `,
  "/styles.css": {
    code: styles(`
    .app {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      align-items: center;
      gap: 12px;
    }
    
    .sortable-item {
      max-width: 300px;
      width: 100%;
      display: flex;
      border-radius: 8px;
      background-color: var(--shark-800);
      box-shadow: var(--shadow-border-shiny);
      padding: 12px;
      z-index: 10;
      align-items: center;
      cursor: grab;
      font-weight: 900;
      gap: 8px;
    }
    
    .sortable-item-active {
      background-color: var(--shark-700);
    }
    
    .drag-handle {
      height: 16px;
      width: 16px;
      cursor: grab;
      color: var(--silver-700);
    }
    
    .drag-handle:active {
      cursor: grabbing;
    }
    
    .drag-handle:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    `),
    hidden: true,
  },
};

const SortableDndSandPack = () => (
  <Sandpack
    id="sortable-dnd-sandpack"
    files={files}
    customSetup={{
      dependencies: {
        "@dnd-kit/core": "6.0.5",
        "@dnd-kit/sortable": "7.0.1",
        nanoid: "4.0.0",
        "@radix-ui/react-icons": "1.1.1",
      },
    }}
  />
);

export default SortableDndSandPack;
