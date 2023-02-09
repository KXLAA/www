import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Show } from "@/components/common/Show";
import { cx } from "@/lib/cx";
import { useIsMobile } from "@/lib/hooks/responsive";

type LiveAreaProps = {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  status?: React.ReactNode;
};

export function LiveArea(props: LiveAreaProps) {
  const isMobile = useIsMobile();

  const { children, className, footer, status } = props;
  return (
    <div className="relative flex flex-col justify-end w-full p-2 border rounded-xl bg-cod-gray-800 border-cod-gray-600">
      <div
        className={cx(
          "flex flex-col justify-end w-full h-60 md:p-10 p-6 rounded-xl live-area bg-shark-900",
          className
        )}
      >
        {children}
      </div>

      <AnimatePresence>
        {status && !isMobile && (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring" }}
            className={cx(
              "absolute z-10 left-0 flex items-center justify-between w-full p-6 text-xs text-silver-400 mix-blend-lighten backdrop-blur border-t border-[#1F1F22] border-dashed mb-0.5",
              footer ? "bottom-0" : "bottom-4"
            )}
          >
            {status}
          </motion.div>
        )}
      </AnimatePresence>

      <Show when={!!footer}>{footer}</Show>
    </div>
  );
}

export function useStatus(reset?: number) {
  const [status, setStatus] = React.useState<React.ReactNode | undefined>(
    undefined
  );

  React.useEffect(() => {
    const time = reset || 7000;

    if (status) {
      const timer = setTimeout(() => {
        setStatus(undefined);
      }, time);
      return () => clearTimeout(timer);
    }
  }, [status, reset]);

  return [status, setStatus] as const;
}
