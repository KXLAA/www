"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { cx } from "@/lib/cx";
import { useIsMobile } from "@/lib/responsive";

type WidgetAreaProps = {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  status?: React.ReactNode;
  src?: string;
};

export function WidgetArea(props: WidgetAreaProps) {
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="relative flex flex-col justify-end w-full p-2 border bg-gray-2 border-gray-6">
        <div
          className={cx(
            "flex flex-col justify-end w-full  min-h-[240px] md:p-10 p-6 bg-gray-1 border border-gray-6 relative",
            props.className
          )}
        >
          {props.children}
          <div className="absolute inset-0 h-full w-full  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
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
                "absolute left-0 flex items-center justify-between w-full p-6  px-2 text-sm mix-blend-lighten backdrop-blur border-t border-gray-6 border-dashed mb-0.5 bg-gray-1",
                props.footer ? "bottom-0" : "bottom-4"
              )}
            >
              {props.status}
            </motion.div>
          )}
        </AnimatePresence>

        {props.footer && props.footer}
      </div>
      {props.src && (
        <div className="border border-t-0 p-1 text-xs border-gray-6">
          {props.src}
        </div>
      )}
    </div>
  );
}
