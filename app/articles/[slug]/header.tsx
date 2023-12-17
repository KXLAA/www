import { BreadCrumb } from "@/components/bread-crumb";
import { Article } from "@/contentlayer/generated";

type Props = {
  article: Article;
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

      <div className="flex items-center justify-center gap-1 text-gray-dark-11 underline-offset-1 w-fit font-medium text-lg">
        <span className="m-0">{article.publishedAt}</span>
        <span>/</span>
        <span>{article.readingTime.text} </span>
      </div>
    </header>
  );
}
