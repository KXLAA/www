import Sandpack, { styles } from "@/components/mdx/widgets/common/Sandpack";

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
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const [draggables, setDraggables] = React.useState([...draggable]);

  return (
    <div style={{ width: "100%", minHeight: "100vh" }} className="dotted-bg">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {draggables.map((d) => (
          <Draggable
            key={d.id}
            id={d.id}
            name={d.name}
            styles={{
              position: "absolute",
              left: \`\${d.position.x}px\`,
              top: \`\${d.position.y}px\`
            }}
          />
        ))}
      </DndContext>
    </div>
  );

  function handleDragEnd(ev: DragEndEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    draggable.position.x += ev.delta.x;
    draggable.position.y += ev.delta.y;

    setDraggables((draggables) =>
      draggables.map((d) => (d.id === draggable.id ? draggable : d))
    );
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
      background-color: var(--shark-800);
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
};

const FreeDnDSandPack = () => (
  <Sandpack
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
