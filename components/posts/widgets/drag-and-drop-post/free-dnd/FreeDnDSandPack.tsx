import PostCodeSandpack, { styles } from "@/components/posts/PostCodeSandpack";

const files = {
  "/App.tsx": `
  import React from "react";
  import type { DragEndEvent } from "@dnd-kit/core";
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
  
  const draggable = [
    {
      id: "DG",
      name: "D",
      position: {
        x: 24,
        y: 24
      }
    },
    {
      id: "KA",
      name: "K",
      position: {
        x: 164,
        y: 164
      }
    }
  ];
  
  function App() {
    //Sensors are an abstraction to detect different input methods in
    //order to initiate drag operations, respond to movement and end or
    //cancel the operation. See more here: https://docs.dndkit.com/api-documentation/sensors
    const sensors = useSensors(
      useSensor(KeyboardSensor),
      useSensor(TouchSensor),
      useSensor(MouseSensor)
    );
  
    const [draggables, setDraggables] = React.useState([...draggable]);
  
    return (
      <div style={{ width: "100%", minHeight: "100vh" }} className="dotted-bg">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {draggables.map((draggable) => (
            <Draggable
              {...draggable}
              key={draggable.id}
              //Pass current position as css styles, makes sure we can drag element
              //across the viewport
              styles={{
                position: "absolute",
                left: \`\${draggable.position.x}px\`,
                top: \`\${draggable.position.y}px\`
              }}
            />
          ))}
        </DndContext>
      </div>
    );
  
    function handleDragEnd(ev: DragEndEvent) {
      //Get the id of the active draggable
      const activeId = ev.active.id;
  
      //Update the state
      setDraggables((draggables) => {
        return draggables.map((draggable) => {
          //if draggable id matches the active id
          if (draggable.id === activeId) {
            return {
              ...draggable,
              //update its position with the new position in the delta object in
              //the drag end event
              position: {
                x: draggable.position.x += ev.delta.x,
                y: draggable.position.y += ev.delta.y
              }
            };
          }
          //return draggable that is not active
          return draggable;
        });
      });
    }
  }
  export default App;  
    `,
  "/styles.css": {
    code: styles(`
    .draggable {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shark-900);
      gap: 4px;
      width: 64px;
      height: 64px;
      border-radius: 8px;
      box-shadow: var(--shadow-border-shiny);
      cursor: grab;
      z-index: 10;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
        drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
      font-size: 32px;
      font-weight: 900;
    }
    
    .draggable:active {
      cursor: grabbing;
      background-color: var(--shark-700);
    }    
    `),
    hidden: true,
  },
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
    //Read more about the useDraggable hook here: https://docs.dndkit.com/api-documentation/draggable/usedraggable
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id
    });
  
    const style = {
      transform: CSS.Translate.toString(transform),
      ...styles
    };
  
    return (
      <div
        ref={setNodeRef}
        style={{ ...style }}
        className="draggable"
        {...listeners}
        {...attributes}
      >
        <span> {name}</span>
      </div>
    );
  }   
  `,
};

const FreeDnDSandPack = () => (
  <PostCodeSandpack
    id="free-dnd-sandpack"
    files={files}
    customSetup={{
      dependencies: {
        "@dnd-kit/core": "6.0.5",
        "@dnd-kit/sortable": "7.0.1",
      },
    }}
  />
);

export default FreeDnDSandPack;
