import Sandpack from "@/components/mdx/widgets/common/Sandpack";

const files = {
  "/App.tsx": `
import React from 'react';
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import './styles.css';
import {Draggable} from './Draggable';

const draggable = [
  {
      id: "DG",
      name: "D",
      position: {
        x: 24,
        y: 24,
      },
  },
];

  function App() {
    const sensors = useSensors(
      useSensor(KeyboardSensor),
      useSensor(TouchSensor),
      useSensor(MouseSensor)
    );
    const [draggables, setDraggables] = React.useState([...draggable]);
    
    return (
      <div style={{width: '100%', minHeight: '100vh'}} className='dotted-bg'>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
      {draggables.map((d) => (
          <Draggable
            key={d.id}
            id={d.id}
            name={d.name}
            styles={{
              position: "absolute",
              left: \`\${d.position.x}px\`,
              top: \`\${d.position.y}px\`,
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

      const _draggables = draggables.map((d) =>
        d.id === draggable.id ? draggable : d
      );
  
      setDraggables(_draggables);
    }
  }
  export default App;
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
  }
  
    h1 {
      color: tomato;
    }

    .draggable {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #111112;
      gap:4px;
      width: 64px;
      height: 64px;
      aspect-ratio: 1 / 1;
      padding: 0.75rem;
      border-radius: 0.375rem/* 6px */;
      color: #C0C0C0;
      box-shadow: inset 0 0 0 1px hsl(0deg 0% 100% / 10%);
      cursor: grab;
      z-index: 10;
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
      font-size: 40px;
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
        className="draggable"
        {...listeners}
        {...attributes}
      >
        <span className="text-base font-black"> {name}</span>
      </div>
    );
  }
  `,
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
