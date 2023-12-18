"use client";

import CodePlayGround, { styles } from "@/components/articles/code-playground";

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
      transition,
      isDragging
    } = useSortable({
      id: id,
      data: { name, type: "item" }
    });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? 0.2 : 1
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
  
  export function OverlayItem(props: { name: string }) {
    const { name } = props;
    return (
      <div className="sortable-item">
        <DragHandleDots2Icon className="drag-handle overlay" />
        <span>{name}</span>
      </div>
    );
  }
  
  `,
  "SortableContainer.tsx": `
  import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
  import { Item } from "./items";
  import { CSS } from "@dnd-kit/utilities";
  import { useDroppable } from "@dnd-kit/core";
  import { SortableItem, OverlayItem } from "./SortableItem";
  
  export type SortableContainerProps = {
    id: string;
    name?: string;
    items: Item[];
  };
  
  export function SortableContainer(props: SortableContainerProps) {
    const { name, id, items } = props;
    
    //Read more about the useSortable hook here: https://docs.dndkit.com/presets/sortable/usesortable
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({
      id: id,
      data: { name, type: "container" }
    });
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? 0.2 : 1
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
          <div className="sortable-container_wrapper">
            {items.length === 0 ? (
              <div key={id} className="droppable">
                List is empty
              </div>
            ) : (
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((s) => (
                  <SortableItem {...s} key={s.id} />
                ))}
              </SortableContext>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export function OverlayContainer(props: SortableContainerProps) {
    const { name, id, items } = props;
  
    return (
      <div className="sortable-container">
        <div>
          <div className="sortable-container_header overlay">{name}</div>
  
          <div className="sortable-container_wrapper">
            {items.length === 0 ? (
              <div key={id} className="droppable">
                List is empty
              </div>
            ) : null}
            {items.map((s) => (
              <OverlayItem {...s} key={s.id} />
            ))}
          </div>
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
      align-items: flex-start;
      background: var(--shark-900);
      gap: 8px;
      width: 100%;
      border-radius: 6px;
      box-shadow: var(--shadow-border-shiny);
      z-index: 10;
      border-radius: 6px;
      min-height: 100%;
    }
    
    .sortable-container > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    
    .sortable-container_wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 16px;
    }
    
    .sortable-container_header {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 8px;
      font-size: 24px;
      line-height: 32px;
      font-weight: 900;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background: var(--shark-800);
      cursor: grab;
      box-shadow: var(--shadow-border-shiny);
    }
    
    .sortable-container_header:active {
      cursor: grabbing;
    }
    
    .sortable-item {
      display: flex;
      width: 100%;
      height: 64px;
      font-size: 24px;
      line-height: 32px;
      align-items: center;
      border-radius: 8px;
      background-color: var(--shark-800);
      padding: 12px;
      z-index: 10;
      gap: 4px;
      font-weight: 900;
    }
    
    .drag-handle {
      height: 24px;
      width: 24px;
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
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 80px;
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      border-radius: 6px;
      box-shadow: var(--shadow-border-shiny);
      color: var(--silver-900);
      text-transform: uppercase;
    }
    
    .overlay {
      cursor: grabbing;
    }
    `),
    hidden: true,
  },
  "App.tsx": `
  import {
    DndContext,
    KeyboardSensor,
    TouchSensor,
    useSensor,
    useSensors,
    MouseSensor,
    closestCorners,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    DragOverlay
  } from "@dnd-kit/core";
  import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates
  } from "@dnd-kit/sortable";
  import React from "react";
  import { initialItems, Item } from "./items";
  import {
    OverlayContainer,
    SortableContainer,
    SortableContainerProps
  } from "./SortableContainer";
  import { OverlayItem } from "./SortableItem";
  
  export default function App() {
    const [sortables, setSortables] = React.useState([...initialItems]);
  
    //The state of the active draggable, used to render the drag overlay below
    const [activeItem, setActiveItem] = React.useState<
      SortableContainerProps | Item | null
    >(null);
    //Sensors are an abstraction to detect different input methods in
    //order to initiate drag operations, respond to movement and end or
    //cancel the operation. See more here: https://docs.dndkit.com/api-documentation/sensors
    const sensors = useSensors(
      useSensor(TouchSensor),
      useSensor(MouseSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );
  
    const containerIds = sortables.map((s) => s.id);
  
    return (
      <DndContext
        //collision detection algorithm best suited for sortable interfaces and multiple containers
        //read more here: https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
      >
        <SortableContext
          //read more on the SortableContext here https://docs.dndkit.com/presets/sortable/sortable-context
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
        <DragOverlay>
          {activeItem ? (
            //Render a drag overlay for either the container or sortable item based on the id of the active item
            // check here https://docs.dndkit.com/api-documentation/draggable/drag-overlay for more info
            <>
              {containerIds.includes(activeItem.id) ? (
                <OverlayContainer {...(activeItem as SortableContainerProps)} />
              ) : (
                <OverlayItem {...(activeItem as Item)} />
              )}
            </>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  
    //Returns the id of a container based on the id of any of its child items
    function findContainer(id?: string) {
      if (id) {
        if (containerIds.includes(id)) return id;
        const container = sortables?.find((i) =>
          i.items?.find((l) => l?.id === id)
        );
  
        return container?.id;
      }
    }
  
    /*Returns true if we are sorting containers
     * we will know if we are sorting containers if the id of the active item is a
     * container id and it is being dragged over any item in the over container
     * or the over container itself
     */
    function isSortingContainers({
      activeId,
      overId
    }: {
      activeId: string;
      overId: string;
    }) {
      const isActiveContainer = containerIds.includes(activeId);
      const isOverContainer =
        findContainer(overId) || containerIds.includes(overId);
      return !!isActiveContainer && !!isOverContainer;
    }
  
    function handleDragStart(event: DragStartEvent) {
      const { active } = event;
      const activeId = active.id as string;
  
      if (containerIds.includes(activeId)) {
        //set the state of active item if we are dragging a container
        const container = sortables.find((i) => i.id === activeId);
        if (container) setActiveItem(container);
      } else {
        //set the state of active item if we are dragging a container item
        const containerId = findContainer(activeId);
        const container = sortables.find((i) => i.id === containerId);
        const item = container?.items.find((i) => i.id === activeId);
        if (item) setActiveItem(item);
      }
    }
  
    /*In this function we handle when a sortable item is dragged from one container 
    to another container, to do this we need to know:
     - what item is being dragged 
     - what container it is being dragged from
     - what container it is being dragged to
     - what index to insert the active item into, in the new container
     */
    function handleDragOver(event: DragOverEvent) {
      const { active, over } = event;
      if (!active || !over) return;
      const activeId = active.id as string;
      const overId = over.id as string;
      //find the container id of the active item and the container id of the item being dragged over
      const activeContainerId = findContainer(activeId);
      const overContainerId = findContainer(overId);
      if (!overContainerId || !activeContainerId) return;
  
      //we don't want to sort containers, so we return early if we are sorting containers
      if (isSortingContainers({ activeId, overId })) return;
  
      //we only want to update the state if we are dragging over a different container
      if (activeContainerId !== overContainerId) {
        const activeContainer = sortables.find((i) => i.id === activeContainerId);
        const overContainer = sortables.find((i) => i.id === overContainerId);
        const activeItems = activeContainer?.items || [];
        const activeIndex = activeItems.findIndex((i) => i.id === activeId);
        const overItems = overContainer?.items || [];
        const overIndex = sortables.findIndex((i) => i.id === overId);
        let newIndex: number;
        if (containerIds.includes(overId)) {
          //if the container is empty, and we drag over it, the overId would be the id of that container and not
          //the id of any of its items since it is empty so we want to add the item to the end of
          //the container basically making it the last item
          newIndex = overItems.length + 1;
        } else {
          //Get the new index of the item being dragged over if it is a sortable item in the over container
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }
  
        //Update the state
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
  
    /*In this function we handle when a sortable item is sorted within its container
      or when a sortable container is sorted with other sortable container
     */
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (!active || !over) return;
      const activeId = active.id as string;
      const overId = over.id as string;
      const activeContainerId = findContainer(activeId);
      const overContainerId = findContainer(overId);
  
      if (isSortingContainers({ activeId, overId })) {
        if (activeId !== overId) {
          //update sortable containers to their new positions
          setSortables((items) => {
            const oldIndex = sortables.findIndex(
              (f) => f.id === activeContainerId
            );
            const newIndex = sortables.findIndex((f) => f.id === overContainerId);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }
  
      if (activeContainerId === overContainerId) {
        const activeContainer = sortables.find((i) => i.id === activeContainerId);
        const activeItems = activeContainer?.items || [];
        const oldIndex = activeItems.findIndex((i) => i.id === activeId);
        const newIndex = activeItems.findIndex((i) => i.id === overId);
        //update sortable items to their new positions
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
      items: createData(2, (index) => \`ITEM A\${index + 1}\`)
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

export default function SortableMultiDndSandPack() {
  return (
    <CodePlayGround
      id="sortable-multi-dnd-sandpack"
      files={files}
      previewProps={{
        style: { height: 400 },
      }}
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
}
