import { ChevronUpIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import type { PostHeading } from "@/lib/api";
import { cx } from "@/lib/cx";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

type PostSideBarProps = {
  tableOfContent?: PostHeading[];
};

export function PostSideBar(props: PostSideBarProps) {
  const { tableOfContent } = props;
  const idList =
    (tableOfContent?.map((item) => item.link?.slice(1)) as string[]) || [];
  const activeId = useActiveId(idList);

  const isHidden = useHideOnScroll(300);
  return (
    <aside className="md:w-1/3 mt-[1.5em] md:sticky md:top-7 self-start max-w-[300px] flex flex-col gap-4 items-start">
      <ul className="relative flex flex-col items-start gap-2">
        <div className="text-lg font-semibold text-left text-silver-50">
          On this page
        </div>
        {tableOfContent?.map((item) => (
          <li
            className="text-base transition text-silver-700 hover:text-silver-50 text-light"
            key={item.link}
          >
            <motion.a
              href={item.link}
              animate={{
                color: item.link?.slice(1) === activeId ? "#EEEEEE" : "#888888",
              }}
              whileHover={{
                color: "#EEEEEE",
              }}
              transition={{ duration: 0.5 }}
              className={cx(
                item.level === 2 && "ml-0",
                item.level === 3 && "ml-3",
                item.level === 4 && "ml-7",
                item.level === 5 && "ml-11",
                item.level === 6 && "ml-14"
              )}
            >
              {item.content}
            </motion.a>
          </li>
        ))}
      </ul>

      <BackToTop isHidden={isHidden} />
    </aside>
  );
}

function BackToTop({ isHidden }: { isHidden: boolean }) {
  return (
    <AnimatePresence>
      {isHidden && (
        <motion.button
          key="back-to-top"
          animate={{
            opacity: 1,
            y: 0,
          }}
          initial={{
            opacity: 0,
            y: 20,
          }}
          transition={{ duration: 0.6 }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          className="flex items-center justify-center gap-2 text-base transition-colors text-silver-700 hover:text-silver-50"
          onClick={scrollTop}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex items-center justify-center p-1 rounded-lg shadow-border-shiny bg-shark-700">
            <ChevronUpIcon className="w-4 h-4" />
          </div>
          <span>Back to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(``);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds.forEach((id) => {
      if (document.getElementById(id)) {
        observer.observe(document.getElementById(id)!);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        if (document.getElementById(id)) {
          observer.unobserve(document.getElementById(id)!);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
