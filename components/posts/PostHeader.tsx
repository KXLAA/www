import { BreadCrumb } from "@/components/common/BreadCrumb";
import { formatDate } from "@/lib/date";

type PostHeaderProps = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
};

export function PostHeader(props: PostHeaderProps) {
  const { title, date, description } = props;
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

      <div className="relative flex flex-col self-center w-full h-full max-w-[700px] gap-2 border-shimmer rounded-2xl bg-shark-900 p-7">
        <div className="pb-3 border-b border-shark-600">
          <p className="m-0 text-xl font-black">{title}</p>
          <p className="m-0 text-sm font-extralight">{description}</p>
        </div>

        <div className="flex justify-between">
          <p className="m-0 text-xs text-silver-800">
            {formatDate(date, "MM/dd/yyyy")}
          </p>
          <p className="m-0 text-xs text-silver-800">16 minutes • 3166 words</p>
        </div>
      </div>
    </div>
  );
}
