import { AnimatePresence } from "framer-motion";

import { BreadCrumb } from "@/components/common/BreadCrumb";
import { cx } from "@/lib/cx";
import { formatDate } from "@/lib/date";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

import type { Post as PostType } from ".contentlayer/generated";

export type PostHeaderProps = PostType & {
  className?: string;
};

export function PostHeader(props: PostHeaderProps) {
  const isHidden = useHideOnScroll();
  const { title, readingTime, className } = props;
  const date = formatDate(props.publishedAt, "MMMM dd, yyyy");
  return (
    <div className={cx("flex flex-col items-center gap-4 w-full", className)}>
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
              {
                label: "Writing",
                href: "/posts",
              },
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
        <div className="relative flex flex-col self-center justify-end w-full gap-3 p-10 pt-24 pb-8 pl-0 h-52">
          <div className="flex items-center justify-center gap-1 text-[10px] font-light rounded-md text-silver-700 underline-offset-1 w-fit">
            <span className="m-0">{date}</span>
            <span className="font-normal text-silver-900">/</span>
            <span>{readingTime.text} </span>
          </div>
          <BreadCrumb
            plain
            items={[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Writing",
                href: "/posts",
              },
              {
                label: title,
                href: "/posts",
                active: true,
              },
            ]}
          />
          <h1 className="m-0 text-4xl font-medium">{title}</h1>

          <div className="z-10 flex gap-2">
            <div className="flex items-center justify-center gap-1 p-1 px-4 text-xs rounded-md bg-shark-500 text-silver-50 underline-offset-1 w-fit shadow-border-shiny">
              Last Updated July 26, 2022
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
