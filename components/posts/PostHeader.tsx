import { AnimatePresence } from "framer-motion";

import { BreadCrumb } from "@/components/common/BreadCrumb";
import { cx } from "@/lib/cx";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

import type { Post as PostType } from ".contentlayer/generated";

export type PostHeaderProps = PostType & {
  className?: string;
};

export function PostHeader(props: PostHeaderProps) {
  const isHidden = useHideOnScroll();

  return (
    <div
      className={cx(
        "flex flex-col items-center gap-4 w-full mt-4 md:mt-10",
        props.className
      )}
    >
      <AnimatePresence>
        {isHidden && (
          <BreadCrumb
            key="breadcrumb"
            fixed
            floating
            items={[
              { label: "Home", href: "/" },
              {
                label: props.title,
                href: "/posts",
                active: true,
              },
            ]}
          />
        )}
      </AnimatePresence>

      <div
        className={cx(
          "relative flex flex-col self-center justify-end w-full gap-3 px-0 pt-0 pb-6 h-52",
          !isHidden ? "" : "hidden"
        )}
      >
        <BreadCrumb
          plain
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: props.title,
              href: "/posts",
              active: true,
            },
          ]}
        />
        <h1 className="m-0 text-2xl md:text-5xl md:text-[40px] font-bold max-w-[840px]">
          {props.title}
        </h1>
        <div className="flex items-center justify-center gap-1 text-sm font-semibold rounded-md text-gray-dark-11 underline-offset-1 w-fit">
          <span className="m-0">{props.publishedAt}</span>
          <span>/</span>
          <span>{props.readingTime.text} </span>
        </div>

        {/* <Show when={isDateAfter(props.lastUpdatedAt, props.publishedAt)}>
            <div className="z-10 flex gap-2">
              <Tag>
                Updated {formatDate(props.lastUpdatedAt, "MMMM dd, yyyy")}
              </Tag>
            </div>
          </Show> */}
      </div>
    </div>
  );
}
