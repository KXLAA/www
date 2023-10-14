import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Show } from "@/components/common/Show";
import { cx } from "@/lib/cx";

type Item = {
  label: string;
  href?: string;
  active?: boolean;
};
type BreadCrumbProps = {
  items: Array<Item>;
  fixed?: boolean;
  filled?: boolean;
  floating?: boolean;
  className?: string;
  plain?: boolean;
};

export function BreadCrumb(props: BreadCrumbProps) {
  const { items, fixed, floating, className, plain, filled } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className={cx(
        "relative flex items-center w-fit gap-1 md:gap-2 px-4 py-2  font-medium rounded text-gray-dark-11 transition-all text-sm sm:text-lg",
        fixed && "fixed top-7 z-10",
        filled && "bg-gray-dark-2",
        floating && "mix-blend-lighten	backdrop-blur shadow-border-shiny  z-50",
        plain
          ? "border-none !bg-transparent p-0"
          : "shadow-border-shiny bg-gray-dark-2",
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Crumb {...item} />
          <Show when={index !== items.length - 1}>
            <ChevronRight className="w-2 h-2 md:w-3 md:h-3 shrink-0 text-gray-dark-11" />
          </Show>
        </React.Fragment>
      ))}
    </motion.div>
  );
}

function Crumb(props: Item) {
  const { active, label, href } = props;
  if (active) {
    return <span className=" text-gray-dark-12">{label}</span>;
  }

  return (
    <Link
      href={href || ""}
      className="transition-colors hover:text-gray-dark-12 text-gray-dark-11"
    >
      {label}
    </Link>
  );
}
