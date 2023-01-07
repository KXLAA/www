import Sandpack, { styles } from "@/components/mdx/widgets/common/Sandpack";

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
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({
      id: id,
      data: { name, type: "item" }
    });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition
    };
  
    return (
      <div ref={setNodeRef} style={{ ...style }} className="sortable-item">
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
  "SortableContainer.tsx": `import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
  import { Item } from "./items";
  import { CSS } from "@dnd-kit/utilities";
  import { useDroppable } from "@dnd-kit/core";
  import { SortableItem } from "./SortableItem";
  
  type SortableContainerProps = {
    id: string;
    name?: string;
    items: Item[];
  };
  
  type DroppableProps = {
    id: string;
    children?: React.ReactNode;
    className?: string;
  };
  
  export function Droppable(props: DroppableProps) {
    const { id, children, className } = props;
  
    const { setNodeRef } = useDroppable({
      id,
      data: { type: "container" }
    });
  
    return (
      <div ref={setNodeRef} className={className}>
        {children}
      </div>
    );
  }
  
  export function SortableContainer(props: SortableContainerProps) {
    const { name, id, items } = props;
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
    } = useSortable({
      id: id,
      data: { name, type: "container" }
    });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition
    };
  
    return (
      <div ref={setNodeRef} style={{ ...style }} className="sortable-container">
        <div>
          <div
            {...listeners}
            {...attributes}
            className="sortable-container_header"
          >
            {name}
          </div>
          {items.length === 0 ? (
            <Droppable id={id} key={id} className="droppable">
              List is empty
            </Droppable>
          ) : (
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.map((s) => (
                <SortableItem {...s} key={s.id} />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    );
  }
  `,
  "/styles.css": {
    code: styles(`
    .app {
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 24px;
      padding: 24px;
    }
    
    .sortable-container {
      display: flex;
      max-width: 220px;
      width: 100%;
      gap: 8px;
      border-radius: 6px;
      z-index: 10;
      background: var(--shark-800);
      border-radius: 6px;
      box-shadow: var(--shadow-border-shiny);
      padding: 12px;
    }
    
    .sortable-container > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    
    .sortable-container_header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      border-radius: 6px;
      background: var(--shark-600);
      cursor: grab;
      box-shadow: var(--shadow-border-shiny);
    }
    
    .sortable-container_header:active {
      cursor: grabbing;
    }
    
    .sortable-item {
      display: flex;
      align-items: center;
      border-radius: 8px;
      background-color: var(--shark-800);
      box-shadow: var(--shadow-border-shiny);
      padding: 12px;
      z-index: 10;
      gap: 4px;
      font-weight: 900;
    }
    
    .drag-handle {
      height: 16px;
      width: 16px;
      cursor: grab;
      color: var(--silver-700);
    }
    
    .drag-handle:active {
      cursor: grabbing;
    }
    
    .drag-handle:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    
    .droppable {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      color: var(--silver-800);
      text-transform: uppercase;
    }    
    `),
    hidden: true,
  },
  "App.tsx": `import { closestCorners, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
  import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates
  } from "@dnd-kit/sortable";
  import React from "react";
  import { initialItems } from "./items";
  import { SortableContainer } from "./SortableContainer";
  
  export default function App() {
    const [sortables, setSortables] = React.useState([...initialItems]);
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );
  
    return (
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext
          items={sortables}
          strategy={horizontalListSortingStrategy}
        >
          <div className="app">
            {sortables.map((s) => (
              <SortableContainer
                key={s.id}
                id={s.id}
                name={s.name}
                items={s.items}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  
    function findContainer(id?: string) {
      if (id) {
        if (sortables.map((s) => s.id).includes(id)) return id;
  
        //If id is a child item return the parent id
        const container = sortables?.find((i) =>
          i.items?.find((l) => l?.id === id)
        );
  
        return container?.id;
      }
    }
  
    function isSortingContainers(activeId: string, overId: string) {
      return (
        sortables.map((s) => s.id).includes(overId) &&
        sortables.map((s) => s.id).includes(activeId)
      );
    }
  
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      const activeId = active.id as string;
      const overId = over?.id as string;
      if (!activeId || !overId) return;
      const activeContainerId = findContainer(activeId);
  
      if (isSortingContainers(activeId, overId)) {
        if (activeId !== overId) {
          setSortables((items) => {
            const oldIndex = sortables.findIndex((f) => f.id === activeId);
            const newIndex = sortables.findIndex((f) => f.id === overId);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      } else {
        const activeContainer = sortables.find((i) => i.id === activeContainerId);
        const activeItems = activeContainer?.items || [];
        const oldIndex = activeItems.findIndex((i) => i.id === activeId);
        const newIndex = activeItems.findIndex((i) => i.id === overId);
        const newItems = sortables.map((s) =>
          s.id === activeContainerId
            ? {
                ...s,
                items: arrayMove(s.items, oldIndex, newIndex)
              }
            : s
        );
  
        if (oldIndex !== newIndex) {
          setSortables(newItems);
        }
      }
    }
  
    function handleDragOver(event: DragOverEvent) {
      const { active, over } = event;
      const activeId = active.id as string;
      const overId = over?.id as string;
      if (!over || !activeId || !overId) return;
      const activeContainerId = findContainer(activeId);
      const overContainerId = findContainer(overId);
  
      if (!overContainerId || !activeContainerId) return;
      if (isSortingContainers(activeId, overId)) return;
  
      if (activeContainerId !== overContainerId) {
        const activeContainer = sortables.find((i) => i.id === activeContainerId);
        const overContainer = sortables.find((i) => i.id === overContainerId);
        const activeItems = activeContainer?.items || [];
        const activeIndex = activeItems.findIndex((i) => i.id === active.id);
        const overItems = overContainer?.items || [];
        const overIndex = sortables.findIndex((i) => i.id === over.id);
        let newIndex: number;
        if (sortables.map((s) => s.id).includes(over.id as string)) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }
  
        const newItems = sortables.map((item) =>
          // Remove the active item from the old list
          item.id === activeContainerId
            ? {
                ...item,
                items: activeItems.filter((item) => item.id !== active.id)
              }
            : // Add the active item to the new list
            item.id === overContainerId
            ? {
                ...item,
                items: [
                  ...item.items.slice(0, newIndex),
                  activeItems[activeIndex],
                  ...overItems.slice(newIndex, item.items.length)
                ]
              }
            : item
        );
  
        setSortables(newItems);
      }
    }
  }
  `,
  "items.ts": `import { nanoid } from "nanoid";

  function createData(length: number, initializer: (index: number) => string) {
    return [...new Array(length)].map((_, index) => {
      return {
        id: nanoid(),
        name: \`\${initializer(index)}\`
      };
    });
  }
  
  export const initialItems = [
    {
      id: nanoid(),
      name: "Container A",
      items: createData(3, (index) => \`ITEM A\${index + 1}\`)
    },
    {
      id: nanoid(),
      name: "Container B",
      items: createData(2, (index) => \`ITEM B\${index + 1}\`)
    },
  ];
  
  export type Item = {
    id: string;
    name: string;
  };
  `,
};

const SortableMultiDndSandPack = () => (
  <Sandpack
    id="sortable-multi-dnd-sandpack"
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

export default SortableMultiDndSandPack;
