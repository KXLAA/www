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
import { CSS } from "@dnd-kit/utilities";
import { MoveIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import type { Config } from "unique-names-generator";
import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import { Refresh } from "@/components/common/Refresh";
import { cx } from "@/lib/cx";
import { uuid } from "@/lib/uuid";

const uniqueNamesConfig: Config = {
  dictionaries: [colors, animals],
  separator: " ",
  length: 1,
  style: "capital",
};

type DraggableProps = {
  id: string;
  styles?: React.CSSProperties;
  name?: string;
};

function Draggable({ id, styles, name }: DraggableProps) {
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
      className={cx(
        "flex items-center bg-shark-800 justify-center gap-1 w-fit p-3 rounded-md text-silver shadow-border-shiny transition-colors cursor-grab active:cursor-grabbing z-10 drop-shadow-lg",
        isDragging && "bg-shark-700 text-silver-900"
      )}
      {...listeners}
      {...attributes}
    >
      <MoveIcon className="w-5 h-5" strokeWidth={2} />
      <span className="text-base"> {name}</span>
    </div>
  );
}

const draggable = [
  {
    id: uuid(),
    name: "Olive",
    position: {
      x: 24,
      y: 24,
    },
  },
];

export default function DraggableAndDroppable() {
  // const timerRef = React.useRef<any>(null);
  const [status, setStatus] = React.useState<React.ReactNode | undefined>(
    undefined
  );

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const [draggables, setDraggables] = React.useState([...draggable]);
  const addStatus = (message: React.ReactNode, time?: number) => {
    const timer = time || 10000;
    console.log("timer", timer);
    setStatus(message);
  };

  // React.useEffect(() => {
  //   return () => clearTimeout(timerRef.current);
  // }, []);

  return (
    <div className="relative flex flex-col justify-end w-full p-4 rounded-xl bg-shark-800">
      <div className="relative flex flex-col justify-end w-full h-60 p-10 rounded-xl grid-bg border border-[#1F1F22] bg-shark-700">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handelDragStart}
          sensors={sensors}
        >
          <AnimatePresence>
            {draggables.map((d) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring" }}
                key={d.id}
                className="z-20"
              >
                <Draggable
                  styles={{
                    position: "absolute",
                    left: `${d.position.x}px`,
                    top: `${d.position.y}px`,
                  }}
                  key={d.id}
                  id={d.id}
                  name={d.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </DndContext>
      </div>

      <AnimatePresence>
        {status && (
          <motion.div
            //fade in and slide up
            key="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring" }}
            className="absolute bottom-16 left-0 flex items-center justify-between w-full p-6 text-xs text-silver-400 mix-blend-lighten backdrop-blur border-t-2 border-[#1F1F22]"
          >
            {status}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-4 pt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={draggables.length <= 1}
          onClick={resetDraggables}
          className={cx(
            "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
            draggables.length <= 1 &&
              "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
          )}
        >
          <Refresh />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
          onClick={addDraggable}
        >
          ADD DRAGGABLE
        </motion.button>
      </div>
    </div>
  );

  function addDraggable() {
    const newDraggable = {
      id: uuid(),
      name: uniqueNamesGenerator(uniqueNamesConfig),
      position: {
        ...generateRandomAxis(),
      },
    };

    setDraggables([...draggables, newDraggable]);
    addStatus(
      <span className="text-silver-700">
        <span className="font-bold text-green-500">ADD</span> new draggable:{" "}
        <span className="font-bold text-silver-600">{newDraggable.name}</span>
      </span>
    );
  }

  function resetDraggables() {
    setDraggables([...draggable]);
    setStatus(undefined);
  }

  function handelDragStart(ev: DragStartEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    addStatus(
      <span className="text-silver-700">
        <span className="font-bold text-yellow-500">DRAGGING</span> draggable:{" "}
        <span className="font-bold text-silver-600">{draggable.name}</span>
      </span>
    );
  }

  function handleDragEnd(ev: DragEndEvent) {
    const draggable = draggables.find((x) => x.id === ev.active.id)!;
    draggable.position.x += ev.delta.x;
    draggable.position.y += ev.delta.y;

    addStatus(
      <span className="text-silver-700">
        <span className="font-bold text-orange-500">DRAGGED</span> draggable:{" "}
        <span className="font-bold text-silver-600">{draggable.name}</span> to{" "}
        <span className="font-bold text-orange-300">
          x: {draggable.position.x}
        </span>{" "}
        and{" "}
        <span className="font-bold text-orange-300">
          y: {draggable.position.y}
        </span>
      </span>
    );

    const _draggables = draggables.map((d) =>
      d.id === draggable.id ? draggable : d
    );

    setDraggables(_draggables);
  }
}

function generateRandomAxis() {
  return {
    x: Math.floor(Math.random() * 300),
    y: Math.floor(Math.random() * 300),
  };
}
