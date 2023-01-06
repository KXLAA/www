import Sandpack from "@/components/mdx/widgets/common/Sandpack";

const files = {
  "SortableItem.tsx": `
  import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

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
    transition
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
      className="sortable-item"
      {...listeners}
      {...attributes}
    >
      <span>{name}</span>
    </div>
  );
}  
  `,
  "items.ts": `
  export const items = [
    {
      id: "5490276e-68da-47a4-aad8-b445b01fa3b1",
      name: "GOLD"
    },
    {
      id: "b4421627-778a-4ed0-958c-47dc6eafbc50",
      name: "BRONZE"
    },
    {
      id: "677164be-5714-4ffe-a53c-a8ef364744fb",
      name: "APRICOT"
    },
    {
      id: "3ad64ec8-9e0e-4759-a44a-926a49c799a8",
      name: "BEIGE"
    }
  ];
  
  export type Item = {
    id: string;
    name: string;
  };
  
`,
  "App.tsx": `
  import type { DragEndEvent } from "@dnd-kit/core";
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
        <div className="wrapper">
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
    code: `body {
      margin: 0;
      padding: 0;
      font-family: "Roboto", sans-serif;
      background-image: radial-gradient(rgb(31, 31, 31) 11.6%, transparent 11.6%),
        radial-gradient(rgb(31, 31, 31) 11.6%, transparent 11.6%);
      background-position: 0px 0px, 16px 16px;
      background-size: 16px 16px;
      background-color: rgb(18, 18, 18);
      min-width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .wrapper {
      min-width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem ;
    }
    
    .sortable-item {
      display: flex;
      gap: 1rem;
      border-radius: 8px;
      background-color: #111112;
      box-shadow: inset 0 0 0 1px hsl(0deg 0% 100% / 10%);
      padding: 0.5rem /* 8px */;
      z-index: 10;
      width: 100%;
      max-width: 14rem /* 128px */;
      flex-wrap: wrap;
      gap: 0.5rem /* 8px */;
      align-items: center;
      justify-content: center;
      color: #c0c0c0;
      cursor: grab;
      font-weight: 900;
    }
    
    .sortable-item:active {
      cursor: grabbing;
      background-color: #18181a;
    }    
  `,
    hidden: true,
  },
};

const SortableMultiDndSandPack = () => (
  <Sandpack
    id="sortable-multi-dnd-sandpack"
    files={files}
    customSetup={{
      dependencies: {
        "@dnd-kit/core": "6.0.5",
        "@dnd-kit/sortable": "7.0.1",
      },
    }}
  />
);

export default SortableMultiDndSandPack;
