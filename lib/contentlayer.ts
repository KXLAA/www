import { compareDesc } from "date-fns";

import { allArticles, Article, Series } from "@/contentlayer/generated";

export function getPartialArticles(article: Article) {
  return {
    title: article.title,
    og: article.og,
    slug: article.slug,
    publishedAt: article.publishedAt,
    dates: article.dates,
    description: article.description,
    body: {
      code: article.body.code,
    },
    headings: article.headings,
    series: generateSeries(article.series, article.slug),
    readingTime: article.readingTime,
    tags: article.tags,
  };
}

function generateSeries(series?: Series, slug = "") {
  if (!series) return undefined;

  return {
    title: series.title,
    order: series.order,
    articles: allArticles
      .filter((a) => a.series?.title === series.title)
      .sort(
        (a, b) =>
          Number(new Date(a.series!.order)) - Number(new Date(b.series!.order))
      )
      .map((a) => {
        return {
          order: a.series?.order,
          title: a.title,
          slug: a.slug,
          status: a.status,
          isCurrent: a.slug === slug,
        };
      }),
  };
}

export function getPublishedArticles() {
  const articles =
    process.env.NODE_ENV === "development"
      ? allArticles
      : allArticles.filter((a) => a.status === "published");

  return articles
    .sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    )
    .map(getPartialArticles);
}

export type PartialArticle = ReturnType<typeof getPartialArticles>;

export type PartialSeries = ReturnType<typeof generateSeries>;
