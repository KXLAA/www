import { AnimatePresence, motion } from "framer-motion";

type AnimateLayoutProps = {
  className?: string;
  children: React.ReactNode;
  key?: string;
};

export function AnimateLayout(props: AnimateLayoutProps) {
  const { className, children, key } = props;
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={className}
        key={key || "empty"}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
