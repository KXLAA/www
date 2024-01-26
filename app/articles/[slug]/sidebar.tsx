"use client";

import React from "react";

import { cx } from "@/lib/cx";
import { useActiveHeading } from "@/lib/active-headings";
import { useHideOnScroll } from "@/lib/scroll";

type ArticleHeading = {
  id: string;
  content: string;
  link: string;
  level: number;
};

type Props = {
  headings?: Array<ArticleHeading>;
};

export function ArticleSidebar({ headings = [] }: Props) {
  const activeId = useActiveHeading(headings);
  const isHidden = useHideOnScroll(300);

  return headings?.length === 0 ? (
    <div className="max-w-xs w-full invisible" aria-hidden={true} />
  ) : (
    <aside className="max-w-xs w-full font-normal  self-start gap-1 items-start  md:sticky md:top-7 md:flex flex-col hidden">
      <div className="w-full  border border-gray-6">
        <div className="p-3  bg-gray-2 border-b border-gray-6">
          <p className="text-xl font-medium">On this page</p>
        </div>

        <ul className="relative flex flex-col items-start gap-2 p-3 text-lg">
          {headings.map((item) => (
            <li
              className={cx(
                "transition text-gray-11 hover:text-gray-12",
                item.id === activeId ? `text-gray-12 font-semibold` : ``,
                item.level === 2 ? `pl-2` : ``,
                item.level === 3 ? `pl-4` : ``,
                item.level === 4 ? `pl-6` : ``,
                item.level === 5 ? `pl-8` : ``,
                item.level === 6 ? `pl-10` : ``
              )}
              key={item.link}
            >
              <a href={item.link}>{item.content}</a>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={cx(
          "p-2 text-gray-11 hover:text-gray-12 border border-gray-6 w-full transition-colors hover:border-gray-8",
          isHidden ? "visible" : "invisible"
        )}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Back to top
      </button>
    </aside>
  );
}
