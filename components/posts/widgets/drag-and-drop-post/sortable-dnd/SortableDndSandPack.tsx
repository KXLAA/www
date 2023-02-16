import PostCodeSandpack, { styles } from "@/components/posts/PostCodeSandpack";

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
    //Read more about the useSortable hook here: https://docs.dndkit.com/presets/sortable/usesortable
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
        {/* This is a drag handle, instead of making the entire div listen for drag events
          we listen for drag events on this svg icon */}
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
    TouchSensor,
    MouseSensor,
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
    const [sortables, setSortables] = React.useState([...items]);
    //Sensors are an abstraction to detect different input methods in
    //order to initiate drag operations, respond to movement and end or
    //cancel the operation. See more here: https://docs.dndkit.com/api-documentation/sensors
    const sensors = useSensors(
      useSensor(TouchSensor),
      useSensor(MouseSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );
  
    return (
      <DndContext
        //collision detection algorithm best suited for sortable interfaces
        //read more here: https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          //read more on the SortableContext here https://docs.dndkit.com/presets/sortable/sortable-context
          items={sortables}
          strategy={verticalListSortingStrategy}
        >
          <div className="app">
            {sortables.map((sortable) => (
              <SortableItem key={sortable.id} {...sortable} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      const activeId = active.id;
      const overId = over?.id;
  
      if (activeId && overId && activeId !== overId) {
        setSortables((items) => {
          //update items to thier new indexes
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
      align-items: center;
      max-width: 320px;
      width: 100%;
      align-items: center;
      gap: 12px;
    }
    
    .sortable-item {
      display: flex;
      align-items: center;
      background-color: var(--shark-800);
      gap: 8px;
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      height: 64px;
      z-index: 10;
      align-items: center;
      cursor: grab;
      font-weight: 900;
      font-size: 24px;
      line-height: 32px;
    }
    
    .sortable-item-active {
      background-color: var(--shark-700);
    }
    
    .drag-handle {
      height: 24px;
      width: 24px;
      cursor: grab;
      color: var(--silver-800);
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
  <PostCodeSandpack
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
