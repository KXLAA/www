import { AnimatePresence } from "framer-motion";

import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Show } from "@/components/common/Show";
import { Tag } from "@/components/common/Tag";
import { cx } from "@/lib/cx";
import { formatDate, isDateAfter } from "@/lib/date";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

import type { Post as PostType } from ".contentlayer/generated";

export type PostHeaderProps = PostType & {
  className?: string;
};

export function PostHeader(props: PostHeaderProps) {
  const isHidden = useHideOnScroll();
  const { title, readingTime, className } = props;
  const date = props?.publishedAt
    ? formatDate(props?.publishedAt, "MMMM dd, yyyy")
    : null;
  return (
    <div
      className={cx(
        "flex flex-col items-center gap-4 w-full mt-4 md:mt-10",
        className
      )}
    >
      <AnimatePresence>
        {isHidden && (
          <BreadCrumb
            key="breadcrumb"
            fixed
            floating
            items={[
              {
                label: "Home",
                href: "/",
              },
              // {
              //   label: "Writing",
              //   href: "/posts",
              // },
              {
                label: title,
                href: "/posts",
                active: true,
              },
            ]}
          />
        )}
      </AnimatePresence>

      {!isHidden && (
        <div className="relative flex flex-col self-center justify-end w-full gap-3 px-0 pt-0 pb-6 h-52">
          <BreadCrumb
            plain
            items={[
              {
                label: "Home",
                href: "/",
              },
              // {
              //   label: "Writing",
              //   href: "/posts",
              // },
              {
                label: title,
                href: "/posts",
                active: true,
              },
            ]}
          />
          <h1 className="m-0 text-3xl md:text-5xl font-bold max-w-[840px]">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-1 text-sm font-normal rounded-md text-silver-700 underline-offset-1 w-fit">
            <span className="m-0">{date}</span>
            <span>/</span>
            <span>{readingTime.text} </span>
          </div>

          <Show when={isDateAfter(props.lastUpdatedAt, props.publishedAt)}>
            <div className="z-10 flex gap-2">
              <Tag>
                Updated {formatDate(props.lastUpdatedAt, "MMMM dd, yyyy")}
              </Tag>
            </div>
          </Show>
        </div>
      )}
    </div>
  );
}
