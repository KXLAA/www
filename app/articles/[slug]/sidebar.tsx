"use client";

import { cx } from "@/lib/cx";
import React from "react";

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
    <aside className="max-w-xs w-full font-normal  self-start gap-1 items-start  md:sticky md:top-7 flex flex-col">
      <div className="w-full  border border-gray-6">
        <div className="p-3  bg-gray-2 border-b border-gray-6">
          <p className="text-xl font-medium">On this page</p>
        </div>

        <ul className="relative flex flex-col items-start gap-2 p-3 text-lg">
          {headings?.map((item) => (
            <li
              className={cx(
                "transition text-gray-11 hover:text-gray-12",
                item.id === activeId ? `text-gray-12 font-semibold` : ``
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

function useActiveHeading(headings: ArticleHeading[]) {
  const itemIds = headings.map((heading) => heading.id || ``);
  const [activeId, setActiveId] = React.useState(``);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -60% 0%" }
    );

    itemIds.forEach((id) => {
      if (document.getElementById(id)) {
        observerRef.current?.observe(document.getElementById(id)!);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        if (document.getElementById(id)) {
          observerRef.current?.unobserve(document.getElementById(id)!);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

function useHideOnScroll(height?: number) {
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const heightToHideFrom = height || 280;
      const winScroll = window.scrollY;

      if (winScroll >= heightToHideFrom) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [height]);

  return isHidden;
}
