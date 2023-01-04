import Sandpack from "@/components/mdx/widgets/common/Sandpack";

const files = {
  "items.ts": {
    code: `
    export type Item = {
      id: string;
      name: string;
    };

    export type Items = Record<string, Item[]>;
           
    export const items:Items = {
      "A": [],
      "B": [],
      "ROOT": [
          {
              "id": "6f408fe8-015c-4a1d-b99b-709843728712",
              "name": "BL"
          },
          {
              "id": "22860de2-1546-4728-b217-2454604ef100",
              "name": "JA"
          },
          {
              "id": "922d9565-33f8-4f30-8e75-b759d7e24a9f",
              "name": "AQ"
          },
          {
              "id": "86ab718d-b2f9-4f13-a5cc-23440a52cf30",
              "name": "CO"
          }
      ]
  }`,
    hidden: true,
  },
  "/App.tsx": `import React from 'react';
  import type {
    DragOverEvent,
    DragStartEvent,
    UniqueIdentifier,
  } from "@dnd-kit/core";
  import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core";
  import './styles.css';
  import {Draggable} from './Draggable';
  import {Droppable} from './Droppable';
  import {items as defaultItems, Item, Items} from './items';


  function App() {
    const sensors = useSensors(
      useSensor(KeyboardSensor),
      useSensor(TouchSensor),
      useSensor(MouseSensor)
    );
    const [items, setItems] = React.useState(defaultItems);
    const [activeItem, setActiveItem] = React.useState<Item | undefined>(
        undefined
      );    
    
    return (
      <div className='wrapper'>
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragMove={handelDragStart}
      >
        <div className="top-level">
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
      </DndContext>
      </div>
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
  export default App;
    `,
  "Droppable.tsx": `
  import React from "react";
  import { useDroppable } from "@dnd-kit/core";

  type DroppableProps = {
    id: UniqueIdentifier;
    children?: React.ReactNode;
    root?: boolean;
  };
  
  export function Droppable(props: DroppableProps) {
    const { children, id, root } = props;
    const { isOver, setNodeRef } = useDroppable({
      id: id,
    });
  
    return (
      <div
        ref={setNodeRef}
        className={\`droppable \${root ? "droppable-root" : ""}\${
          isOver ? " over" : ""
        }\`}
      >
        {children}
      </div>
    );
  }
  `,
  "Draggable.tsx": `
  import React from "react";
  import { useDraggable } from "@dnd-kit/core";
  import { CSS } from "@dnd-kit/utilities";

  type DraggableProps = {
    id: string;
    styles?: React.CSSProperties;
    name?: string;
  };
  
  export function Draggable(props: DraggableProps) {
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
        className='draggable'
        {...listeners}
        {...attributes}
      >
        <span>{name}</span>
      </div>
    );
  }
  `,
  "/styles.css": {
    code: `
  body{
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
      background-image: radial-gradient(rgb(31, 31, 31) 11.6%, transparent 11.6%),
      radial-gradient(rgb(31, 31, 31) 11.6%, transparent 11.6%);
      background-position: 0px 0px, 16px 16px;
      background-size: 16px 16px;
      background-color: rgb(18, 18, 18);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      
  }
  
    h1 {
      color: tomato;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem/* 16px */;
    }

    .top-level {
      display: flex;
      gap: 0.5rem/* 8px */;
    }

    .droppable {
        display: flex;
        gap: 1rem/* 16px */;
        border-radius: 0.75rem/* 12px */;
        background-color: #111112;
        box-shadow: inset 0 0 0 1px hsl(0deg 0% 100% / 10%);
        padding: 0.5rem/* 8px */;
        z-index: 10;
        width: 8rem/* 128px */;
        height: 8rem/* 128px */;
        flex-wrap: wrap;
        gap: 0.5rem/* 8px */;
        align-items: center;
        justify-content: center;
    }

    .over {
        background-color: #18181A;
    }

    .droppable-root {
        width: 264px;
        height: 4rem/* 64px */;
    }

    .draggable {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #111112;
      gap:4px;
      width: 3rem/* 48px */;
      height: 3rem/* 48px */;
      aspect-ratio: 1 / 1;
      padding: 0.75rem;
      border-radius: 0.375rem/* 6px */;
      color: #C0C0C0;
      box-shadow: inset 0 0 0 1px hsl(0deg 0% 100% / 10%);
      cursor: grab;
      z-index: 10;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
      font-size: 18px;
      font-weight: 900;
    }

    .draggable:active {
      cursor: grabbing;
      background-color: #18181A;
      color: #888888;
    }
    `,
    hidden: true,
  },
};

const DroppableDndSandPack = () => (
  <Sandpack
    id="droppable-dnd-sandpack"
    files={files}
    customSetup={{
      dependencies: {
        "@dnd-kit/core": "6.0.5",
        "@dnd-kit/sortable": "7.0.1",
      },
    }}
  />
);

export default DroppableDndSandPack;
