import { DiamondIcon } from "lucide-react";

import { BreadCrumb } from "@/components/bread-crumb";
import { PartialArticle } from "@/lib/contentlayer";
import { cx } from "@/lib/cx";

type Props = {
  article: PartialArticle;
};

export function ContentHeader({ article }: Props) {
  return (
    <header className="flex flex-col gap-4">
      <span
        className={cx(
          "text-sm font-normal bg-amber-3 border border-amber-6 text-amber-11 p-1 px-2 w-fit mb-4",
          article.dates.isOld ? "flex" : "hidden"
        )}
      >
        This article is more than {article.dates.relativeDate} old
      </span>

      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: article.title,
            href: `/articles/${article.slug}`,
            active: true,
          },
        ]}
      />
      <h1 className="text-4xl font-bold">{article.title}</h1>

      <div className="flex items-center justify-center gap-3 text-gray-dark-11 underline-offset-1 w-fit font-medium text-lg">
        <span className="m-0">{article.publishedAt}</span>
        <DiamondIcon className="w-4 h-4" />
        <span>{article.readingTime.text} </span>
      </div>
    </header>
  );
}
