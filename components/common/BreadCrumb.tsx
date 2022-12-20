import { ChevronRightIcon } from "@radix-ui/react-icons";
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
    <div
      className={cx(
        "relative flex items-center  w-fit gap-2 px-4 py-2 text-[11px] font-medium rounded-md   text-silver-600 transition-all",
        fixed && "fixed top-7 z-10",
        filled && "gradient-bg",
        floating && "mix-blend-lighten	backdrop-blur	bg-shark-900 shiny-border",
        plain
          ? "border-none !bg-transparent px-0"
          : "border-shimmer gradient-bg",
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Crumb {...item} />
          <Show when={index !== items.length - 1}>
            <ChevronRightIcon className="w-3 h-3 shrink-0 text-silver-600" />
          </Show>
        </React.Fragment>
      ))}
    </div>
  );
}

function Crumb(props: Item) {
  const { active, label, href } = props;
  if (active) {
    return <span className="text-white">{label}</span>;
  }

  return (
    <Link href={href || ""} className="transition-colors hover:text-silver-400">
      {label}
    </Link>
  );
}
