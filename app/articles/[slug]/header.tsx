import { DiamondIcon } from "lucide-react";

import { BreadCrumb } from "@/components/bread-crumb";
import { Article } from "@/contentlayer/generated";
import { PartialArticle } from "@/lib/contentlayer";

type Props = {
  article: PartialArticle;
};

export function ArticleHeader({ article }: Props) {
  return (
    <header className="flex flex-col gap-4">
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
