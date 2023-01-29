import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { motion } from "framer-motion";

import { Refresh } from "@/components/common/Refresh";
import { LiveArea } from "@/components/mdx/widgets/common/LiveArea";
import { cx } from "@/lib/cx";

import type { ContainerProps, Item } from "./controller";
import { useController } from "./controller";
import { OverlayContainer, SortableContainer } from "./SortableContainer";
import { OverlayItem } from "./SortableItem";

type SortableDndProps = {
  itemCount?: number;
};

export default function SortableMultiDnd(props: SortableDndProps) {
  const { itemCount = 3 } = props;
  const { actions, state } = useController(itemCount);

  return (
    <LiveArea
      status={state.status}
      footer={
        <div className="flex justify-center gap-4 p-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={cx(
              "z-10 flex items-center justify-center w-8 gap-2 text-xs transition-colors rounded-md bg-shark-900 shadow-border-shiny hover:bg-shark-800",
              !state.isDirty &&
                "bg-shark-700 text-silver-400 pointer-events-none cursor-not-allowed"
            )}
            onClick={actions.handleReset}
          >
            <Refresh />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="z-10 px-4 py-2 text-xs font-bold transition-colors rounded-md bg-shark-900 shadow-border-shiny text-silver-600 hover:bg-shark-800"
            onClick={actions.handleToggleDragHandles}
          >
            TOGGLE DRAG HANDLES
          </motion.button>
        </div>
      }
    >
      <DndContext
        sensors={state.sensors}
        onDragEnd={actions.handleDragEnd}
        onDragOver={actions.handleDragOver}
        onDragStart={actions.handleDragStart}
        collisionDetection={state.collisionDetection}
      >
        <SortableContext
          items={state.sortables.map((s) => s.id)}
          strategy={state.strategy}
        >
          <div
            className={cx(
              "flex justify-center w-full min-h-full gap-4",
              state.isMobile && "flex-col"
            )}
          >
            {state.sortables.map((s) => (
              <SortableContainer
                {...s}
                key={s.id}
                showDragHandles={state.showDragHandles}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {state.activeItem ? (
            <>
              {state.containerIds.includes(state.activeItem.id) ? (
                <OverlayContainer
                  {...(state.activeItem as ContainerProps)}
                  showDragHandles={state.showDragHandles}
                />
              ) : (
                <OverlayItem
                  {...(state.activeItem as Item)}
                  showDragHandles={state.showDragHandles}
                />
              )}
            </>
          ) : null}
        </DragOverlay>
      </DndContext>
    </LiveArea>
  );
}
