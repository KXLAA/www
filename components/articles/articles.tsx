import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { PageSection } from "@/components/layout";
import { getPublishedArticles } from "@/lib/contentlayer";

const allArticles = getPublishedArticles();

type ArticlesProps = {
  showAllLink?: boolean;
};

export function Articles(props: ArticlesProps) {
  const articles = props.showAllLink ? allArticles.slice(0, 3) : allArticles;

  return (
    <div className="flex flex-col gap-2">
      <PageSection title="Writing">
        {articles.map((a) => (
          <Link
            href={`/articles/${a.slug}`}
            className="border-b border-gray-6 first:border-t p-4 flex flex-col gap-1 hover:bg-gray-2 hover:border-gray-6  transition-colors"
            key={a.slug}
          >
            <p className="text-2xl font-medium text-gray-11">{a.title}</p>
            <div className="flex gap-1 text-lg text-gray-10 text-light">
              {a.description}
            </div>
            <p className="flex text-sm text-gray-9 font-medium mt-1">
              {a.publishedAt}
            </p>
          </Link>
        ))}
      </PageSection>
      {props.showAllLink && (
        <Link
          className="border justify-between border-gray-6 flex items-start hover:text-gray-12 hover:bg-gray-2 transition-colors text-gray-10 text-lg p-2 px-4 font-semibold group"
          href="/articles"
        >
          <div>view all</div>
          <ChevronRightIcon className="transform group-hover:translate-x-2 transition-transform" />
        </Link>
      )}
    </div>
  );
}
