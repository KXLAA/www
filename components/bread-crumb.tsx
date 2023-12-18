import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cx } from "@/lib/cx";

type BreadCrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

type BreadCrumbProps = {
  items: Array<BreadCrumbItem>;
  className?: string;
};

export function BreadCrumb(props: BreadCrumbProps) {
  const { items, className } = props;

  return (
    <div
      className={cx(
        "relative flex items-center w-fit gap-2  text-gray-11 transition-all text-xl font-medium",
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Crumb {...item} />
          {index !== items.length - 1 && (
            <ChevronRightIcon className="w-5 h-5 !shrink-0 text-gray-11" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Crumb(props: BreadCrumbItem) {
  const { active, label, href } = props;
  if (active) {
    return <span className="text-gray-12 line-clamp-1">{label}</span>;
  }

  return (
    <Link
      href={href || ""}
      className="transition-colors hover:text-gray-12 text-gray-11"
    >
      {label}
    </Link>
  );
}
