"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import useMeasure from "react-use-measure";

type Variant = {
  opacity: number;
  height: string | number;
  x: number;
};

type AnimateHeightProps = {
  isVisible: boolean;
  ease?: string;
  duration?: number;
  className?: string;
  variants?: {
    open: Variant;
    collapsed: Variant;
  };
  children: React.ReactNode;
};

const defaultVariants = {
  open: {
    opacity: 1,
    height: "auto",
    x: 0,
  },
  collapsed: { opacity: 0, height: 0, x: 0 },
};

export function AnimateHeight(props: AnimateHeightProps) {
  const {
    isVisible,
    ease = "easeInOut",
    duration = 0.5,
    className,
    variants = defaultVariants,
    children,
  } = props;

  const [ref, bounds] = useMeasure();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{ overflow: "hidden", width: "100%" }}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={variants}
          className={className}
          transition={{
            ease,
            duration: duration
              ? duration
              : getAutoHeightDuration(bounds?.height) / 1000,
          }}
        >
          <motion.div
            style={{ display: isVisible ? "block" : "none" }}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getAutoHeightDuration(height: number) {
  if (!height) return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
