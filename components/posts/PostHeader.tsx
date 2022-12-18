import { BreadCrumb } from "@/components/common/BreadCrumb";
import { formatDate } from "@/lib/date";

type PostHeaderProps = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  duration?: string;
};

export function PostHeader(props: PostHeaderProps) {
  const { title, duration } = props;
  const date = formatDate(props.date, "MMMM dd, yyyy");
  return (
    <div className="flex flex-col items-center gap-4">
      <BreadCrumb
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

      <div className="relative flex flex-col self-center w-full h-full max-w-[700px] gap-2 border-shimmer rounded-2xl bg-shark-900 p-4 ">
        <h1 className="flex flex-col gap-2 pb-3 m-0 text-3xl font-bold border-b border-shark-600">
          {title}
        </h1>

        <div className="flex gap-1 text-sm font-bold text-silver-800">
          <span className="m-0 text-sm ">{date}</span>
          <span className="font-bold text-silver-900">/</span>
          <span>{duration} </span>
        </div>
      </div>
    </div>
  );
}
