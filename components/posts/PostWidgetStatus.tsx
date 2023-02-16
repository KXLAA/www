import { motion } from "framer-motion";
import React from "react";

import { cx } from "@/lib/cx";

type PostWidgetStatusProps = {
  children: React.ReactNode;
  variant?: "green" | "orange" | "red" | "yellow" | "blue" | "gray";
  className?: string;
};

export function PostWidgetStatus(props: PostWidgetStatusProps) {
  const { children, variant = "gray", className } = props;
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring" }}
      className={cx(
        "px-2 py-0.5 rounded-md text-[10px] mb-4",
        variant === "green" &&
          "bg-green-dark-2 border border-green-dark-4 text-green-dark-11",
        variant === "orange" &&
          "bg-orange-dark-2 border border-orange-dark-4 text-orange-dark-11",
        variant === "red" &&
          "bg-red-dark-2 border border-red-dark-4 text-red-dark-11",
        variant === "yellow" &&
          "bg-primary-alpha-2 border border-primary-alpha-3 text-primary-10",
        variant === "blue" &&
          "bg-indigo-dark-2 border border-indigo-dark-4 text-indigo-dark-11",
        variant === "gray" &&
          "bg-gray-dark-3 border border-gray-dark-4 text-gray-dark-12",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function usePostWidgetStatus(reset?: number) {
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
