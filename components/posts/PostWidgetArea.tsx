import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Show } from "@/components/common/Show";
import { cx } from "@/lib/cx";
import { useIsMobile } from "@/lib/hooks/responsive";

type PostWidgetAreaProps = {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  status?: React.ReactNode;
};

export function PostWidgetArea(props: PostWidgetAreaProps) {
  const isMobile = useIsMobile();
  return (
    <div className="relative flex flex-col justify-end w-full p-2 border rounded-xl bg-cod-gray-800 border-cod-gray-600">
      <div
        className={cx(
          "flex flex-col justify-end w-full h-60 md:p-10 p-6 rounded-xl live-area bg-shark-900",
          props.className
        )}
      >
        {props.children}
      </div>

      <AnimatePresence>
        {props.status && !isMobile && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring" }}
            className={cx(
              "absolute z-10 left-0 flex items-center justify-between w-full p-6 text-xs text-silver-400 mix-blend-lighten backdrop-blur border-t border-[#1F1F22] border-dashed mb-0.5",
              props.footer ? "bottom-0" : "bottom-4"
            )}
          >
            {props.status}
          </motion.div>
        )}
      </AnimatePresence>

      <Show when={!!props.footer}>{props.footer}</Show>
    </div>
  );
}
