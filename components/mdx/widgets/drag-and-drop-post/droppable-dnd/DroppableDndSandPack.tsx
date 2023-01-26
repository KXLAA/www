import Sandpack, { styles } from "@/components/mdx/widgets/common/Sandpack";

const files = {
  "items.ts": {
    code: `import { nanoid } from "nanoid";

    export type Item = {
      id: string;
      name: string;
      containerId: string;
    };
    
    export type Items = Item[];
    
    export const items: Items = [
      {
        id: nanoid(),
        name: "AQ",
        containerId: "root"
      },
      {
        id: nanoid(),
        name: "CO",
        containerId: "root"
      },
      {
        id: nanoid(),
        name: "BL",
        containerId: "root"
      },
      {
        id: nanoid(),
        name: "JA",
        containerId: "root"
      }
    ];
    `,
    hidden: true,
  },
  "/App.tsx": `
  import React from "react";
  import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
  import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    DragOverlay,
    useSensors
  } from "@dnd-kit/core";
  import "./styles.css";
  import { Draggable } from "./Draggable";
  import { Droppable } from "./Droppable";
  import { items as defaultItems, Item } from "./items";
  
  function App() {
    const sensors = useSensors(
      useSensor(KeyboardSensor),
      useSensor(TouchSensor),
      useSensor(MouseSensor)
    );
    const [draggables, setDraggables] = React.useState([...defaultItems]);
    const [containers] = React.useState(["A", "B"]);
    const [activeItem, setActiveItem] = React.useState<Item | undefined>(
      undefined
    );
  
    return (
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragStart={handelDragStart}
      >
        <div className="app">
          <div className="containers">
            {containers.map((id) => (
              <Droppable key={id} id={id} className="droppable">
                {draggables
                  .filter((draggable) => draggable.containerId === id)
                  .map((draggable) => (
                    <Draggable key={draggable.id} {...draggable} />
                  ))}
              </Droppable>
            ))}
          </div>
          <Droppable id="root" className="root-droppable">
            {draggables
              .filter((draggable) => draggable.containerId === "root")
              .map((draggable) => (
                <Draggable key={draggable.id} {...draggable} />
              ))}
          </Droppable>
        </div>
        <DragOverlay>
          {activeItem && (
            <div className="draggable draggable-overlay">{activeItem.name}</div>
          )}
        </DragOverlay>
      </DndContext>
    );
  
    function handelDragStart(ev: DragStartEvent) {
      const { active } = ev;
      const activeId = active.id;
      const activeItem = draggables.find((item) => item.id === activeId);
      setActiveItem(activeItem);
    }
  
    function handleDragOver(ev: DragOverEvent) {
      const { active, over } = ev;
      if (!over) return;
      const activeId = active.id;
      const overId = over.id as string;
  
      setDraggables((prev) => {
        return prev.map((item) => {
          if (item.id === activeId) {
            return {
              ...item,
              containerId: overId
            };
          }
          return item;
        });
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
    className?: string;
  };
  
  export function Droppable(props: DroppableProps) {
    const { children, id, className } = props;
    const { isOver, setNodeRef } = useDroppable({
      id: id
    });
  
    const style = {
      background: isOver && !(id === "root") ? "#18181a" : ""
    };
  
    return (
      <div ref={setNodeRef} className={className} style={style}>
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1
  };

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
      gap: 24px;
    }
    
    .containers {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .root-droppable {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 16px;
      height: 64px;
    }
    
    .droppable {
      display: flex;
      background: var(--shark-900);
      padding: 8px;
      width: 100%;
      max-width: 176px;
      height: 176px;
      z-index: 10;
      gap: 8px;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      flex-wrap: wrap;
      box-shadow: var(--shadow-border-shiny);
    }
    
    .draggable {
      cursor: grab;
      z-index: 10;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
        drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
      display: flex;
      align-items: center;
      background: var(--shark-900);
      justify-content: center;
      gap: 4px;
      width: 64px;
      height: 64px;
      padding: 6px;
      border-radius: 6px;
      box-shadow: var(--shadow-border-shiny);
      cursor: grab;
      font-weight: 900;
      font-size: 24px;
      line-height: 32px;
    }
    
    .draggable-overlay {
      cursor: grabbing;
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
