"use client";

import { motion } from "framer-motion";
import React from "react";
import { tv } from "tailwind-variants";

type WidgetStatusProps = {
  children: React.ReactNode;
  variant?: "green" | "orange" | "red" | "yellow" | "blue" | "gray";
  className?: string;
};

export function WidgetStatus(props: WidgetStatusProps) {
  const { children, variant, className } = props;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring" }}
      className={status({ variant, className })}
    >
      {children}
    </motion.div>
  );
}

export function usePostWidgetStatus(reset?: number) {
  const [status, setStatus] = React.useState<React.ReactNode>(undefined);

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

const status = tv({
  base: "bg-gray-2 border border-gray-6 text-gray-11 px-1 py-0.5 text-xs",
  variants: {
    variant: {
      green: "bg-green-3 border border-green-6 text-green-11",
      orange: "bg-orange-3 border border-orange-6 text-orange-11",
      red: "bg-red-3 border border-red-6 text-red-11",
      yellow: "bg-yellow-3 border border-yellow-6 text-yellow-10",
      blue: "bg-indigo-3 border border-indigo-6 text-indigo-11",
      gray: "bg-gray-2 border border-gray-6 text-gray-11",
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});
