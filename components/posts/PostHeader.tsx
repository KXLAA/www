import { BreadCrumb } from "@/components/common/BreadCrumb";
import { cx } from "@/lib/cx";
import { formatDate } from "@/lib/date";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";
import type { PostType } from "@/types/post";

export type PostHeaderProps = PostType & {
  className?: string;
};

export function PostHeader(props: PostHeaderProps) {
  const isHidden = useHideOnScroll();
  const { title, duration, className } = props;
  const date = formatDate(props.date, "MMMM dd, yyyy");
  return (
    <div className={cx("flex flex-col items-center gap-4 w-full", className)}>
      {isHidden ? (
        <BreadCrumb
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
      ) : (
        <div className="relative flex flex-col self-center justify-end w-full gap-2 p-10 rounded-2xl shiny-border bg-shark-800 h-60 grids-bg fade-out ">
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
          <h1 className="flex flex-col gap-2 m-0 text-5xl font-light border-shark-600">
            {title}
          </h1>

          <div className="flex gap-1 text-sm underline text-silver-800 underline-offset-1">
            <span className="m-0 text-sm ">{date}</span>
            <span className="text-silver-900">/</span>
            <span>{duration} </span>
          </div>
        </div>
      )}
    </div>
  );
}
