import PostCodeSandpack, { styles } from "@/components/posts/PostCodeSandpack";

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
        containerId: "ROOT"
      },
      {
        id: nanoid(),
        name: "CO",
        containerId: "ROOT"
      },
      {
        id: nanoid(),
        name: "BL",
        containerId: "ROOT"
      },
      {
        id: nanoid(),
        name: "JA",
        containerId: "ROOT"
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
import { items, Item } from "./items";

function App() {
  //Sensors are an abstraction to detect different input methods in
  //order to initiate drag operations, respond to movement and end or
  //cancel the operation. See more here: https://docs.dndkit.com/api-documentation/sensors
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const [draggables, setDraggables] = React.useState([...items]);
  const [containers] = React.useState(["A", "B"]);
  //The state of the active draggable, used to render the drag overlay below
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
                //render draggables within thier respective containers
                .filter((draggable) => draggable.containerId === id)
                .map((draggable) => (
                  <Draggable key={draggable.id} {...draggable} />
                ))}
            </Droppable>
          ))}
        </div>
        <Droppable id="ROOT" className="root-droppable">
          {draggables
            //only render draggables with have a containerId of ROOT
            .filter((draggable) => draggable.containerId === "ROOT")
            .map((draggable) => (
              <Draggable key={draggable.id} {...draggable} />
            ))}
        </Droppable>
      </div>
      <DragOverlay>
        {activeItem && (
          //Render a drag overlay when using multiple containers
          // check here https://docs.dndkit.com/api-documentation/draggable/drag-overlay for more info
          <div className="draggable draggable-overlay">{activeItem.name}</div>
        )}
      </DragOverlay>
    </DndContext>
  );

  function handelDragStart(ev: DragStartEvent) {
    const { active } = ev;
    const activeId = active.id;
    const activeDraggable = draggables.find(
      (draggable) => draggable.id === activeId
    );
    setActiveItem(activeDraggable);
  }

  function handleDragOver(ev: DragOverEvent) {
    const { active, over } = ev;
    if (!over) return;
    //the id of the active draggable
    const activeId = active.id;

    //The id of the continaer a draggable is dragged over
    //in our example the overId can either be ROOT, A or B
    const overId = over.id as string;

    setDraggables((draggables) => {
      return draggables.map((draggable) => {
        //if we are dragging a draggable over a container
        if (draggable.id === activeId) {
          return {
            ...draggable,
            //update its containerId to match the overId
            containerId: overId
          };
        }
        return draggable;
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
    //Read more about the useDroppable hook here: https://docs.dndkit.com/api-documentation/droppable/usedroppable
    const { isOver, setNodeRef } = useDroppable({
      id: id
    });
  
    const style = {
      background: isOver && !(id === "ROOT") ? "#18181a" : ""
    };
  
    return (
      //The callback "setNodeRef"  ref is important, it tells dnd-kit that this is a droppable component
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
    //Read more about the useDraggable hook here: https://docs.dndkit.com/api-documentation/draggable/usedraggable
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      isDragging
    } = useDraggable({
      id //This unique id is required
    });
  
    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0 : 1
    };
  
    return (
      <div
        //This callback ref is important, it tells dnd-kit that this is a draggable component
        ref={setNodeRef}
        style={{ ...style, ...styles }}
        className="draggable"
        //It is important that you spread the listeners & attributes object on the
        //element you want to 'listen' for drag event.
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
  <PostCodeSandpack
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
