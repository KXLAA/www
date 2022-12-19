import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { BreadCrumb } from "@/components/common/BreadCrumb";
import { formatDate } from "@/lib/date";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";

type PostHeaderProps = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  duration?: string;
};

export function PostHeader(props: PostHeaderProps) {
  const isHidden = useHideOnScroll();
  const { title, duration } = props;
  const date = formatDate(props.date, "MMMM dd, yyyy");
  return (
    <div className="flex flex-col items-center gap-4">
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
        <div className="relative flex flex-col self-center w-full h-full max-w-3xl gap-2 p-4 border-shimmer rounded-2xl bg-shark-900 ">
          <Link
            className="flex items-center gap-1 text-sm text-silver-800"
            href="/"
          >
            <ChevronLeftIcon className="w-3 h-3 text-silver-600" />
            Back
          </Link>
          <h1 className="flex flex-col gap-2 pb-3 m-0 text-3xl font-bold border-b border-shark-600">
            {title}
          </h1>

          <div className="flex gap-1 text-sm font-bold text-silver-800">
            <span className="m-0 text-sm ">{date}</span>
            <span className="font-bold text-silver-900">/</span>
            <span>{duration} </span>
          </div>
        </div>
      )}
    </div>
  );
}
