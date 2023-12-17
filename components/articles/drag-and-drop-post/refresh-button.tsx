import { motion } from "framer-motion";

import { Refresh } from "@/components/refresh";
import { cx } from "@/lib/cx";

type RefreshButtonProps = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

export function RefreshButton(props: RefreshButtonProps) {
  return (
    <motion.button
      onClick={props.onClick}
      whileTap={{ scale: 0.95 }}
      className={cx(
        "z-10 flex items-center justify-center w-8 h-8 gap-2 transition-colors  bg-gray-1 border border-gray-5",
        props.className
      )}
    >
      <Refresh />
    </motion.button>
  );
}
