import { motion } from "framer-motion";
import React from "react";

import { useMeasure } from "@/lib/hooks/use-measure";

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
  variants: {
    open: Variant;
    collapsed: Variant;
  };
  children: React.ReactNode;
};

export function AnimateHeight(props: AnimateHeightProps) {
  const { isVisible, ease, duration, className, variants, children } = props;

  const ref = React.useRef(null);
  const bounds = useMeasure(ref);

  return (
    <motion.div
      style={{ overflow: "hidden", width: "100%" }}
      initial={isVisible ? "open" : "collapsed"}
      animate={isVisible ? "open" : "collapsed"}
      inherit={false}
      variants={variants}
      className={className}
      transition={{
        ease,
        duration: duration
          ? duration
          : getAutoHeightDuration(bounds?.height) / 1000,
      }}
    >
      <div
        ref={ref}
        style={{
          width: "100%",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function getAutoHeightDuration(height: number) {
  if (!height) return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
