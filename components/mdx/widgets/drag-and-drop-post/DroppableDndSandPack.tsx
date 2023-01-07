import Sandpack, { styles } from "@/components/mdx/widgets/common/Sandpack";

const files = {
  "items.ts": {
    code: `
import { nanoid } from "nanoid";

export type Item = {
  id: string;
  name: string;
};

export type Items = Record<string, Item[]>;

export const items: Items = {
  A: [
    {
      id: nanoid(),
      name: "AQ"
    },
    {
      id: nanoid(),
      name: "CO"
    }
  ],
  B: [
    {
      id: nanoid(),
      name: "BL"
    },
    {
      id: nanoid(),
      name: "JA"
    }
  ]
};
`,
    hidden: true,
  },
  "/App.tsx": `
  import React from "react";
  import {
    closestCorners,
    DragOverEvent,
    DragStartEvent,
    UniqueIdentifier
  } from "@dnd-kit/core";
  import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  import "./styles.css";
  import { Draggable } from "./Draggable";
  import { Droppable } from "./Droppable";
  import { items as defaultItems, Items } from "./items";
  
  function App() {
    const sensors = useSensors(
      useSensor(KeyboardSensor),
      useSensor(TouchSensor),
      useSensor(MouseSensor)
    );
    const [items, setItems] = React.useState(defaultItems);
  
    return (
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        <div className="app">
          {Object.entries(items).map(([key, value]) => (
            <Droppable key={key} id={key}>
              {value.map((item) => (
                <Draggable key={item.id} id={item.id} name={item.name} />
              ))}
            </Droppable>
          ))}
        </div>
      </DndContext>
    );
  
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
          [overContainer]: [...overItems, activeItem]
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
    id: string;
    children?: React.ReactNode;
  };
  
  export function Droppable(props: DroppableProps) {
    const { children, id } = props;
    const { isOver, setNodeRef } = useDroppable({
      id: id
    });
  
    return (
      <div ref={setNodeRef} className={\`droppable \${isOver ? "over" : ""}\`}>
        {children}
      </div>
    );
  }
  
  `,
  "Draggable.tsx": `
  import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type DraggableProps = {
  id: string;
  styles?: React.CSSProperties;
  name?: string;
};

export function Draggable(props: DraggableProps) {
  const { id, styles, name } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform)
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...styles }}
      className="draggable"
      {...listeners}
      {...attributes}
    >
      <span> {name}</span>
    </div>
  );
}
  `,
  "/styles.css": {
    code: styles(`
    .app {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 40px;
    }
    
    .droppable {
      display: flex;
      background: var(--shark-800);
      padding: 8px;
      z-index: 10;
      max-width: 320px;
      width: 100%;
      height: 52px;
      gap: 8px;
      align-items: flex-start;
      justify-content: flex-start;
      border-radius: 6px;
      box-shadow: var(--shadow-border-shiny);
    }
    
    .over {
      background: var(--shark-700);
    }
    
    .droppable-root {
      width: 264px;
      height: 4rem /* 64px */;
    }
    
    .draggable {
      cursor: grab;
      z-index: 10;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
        drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
      font-size: 18px;
      font-weight: 900;
      display: flex;
      align-items: center;
      background: var(--shark-800);
      justify-content: center;
      gap: 4px;
      width: 70px;
      padding: 6px;
      border-radius: 6px;
      box-shadow: var(--shadow-border-shiny);
      cursor: grab;
    }
    
    .draggable:active {
      cursor: grabbing;
      background-color: var(--shark-700);
    }    
    `),
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
        nanoid: "4.0.0",
      },
    }}
  />
);

export default DroppableDndSandPack;
