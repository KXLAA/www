import { compareDesc } from "date-fns";

import { allArticles, Article, Series } from "@/contentlayer/generated";

export function getPartialArticles(article: Article) {
  return {
    articleType: article.articleType,
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
    lastUpdatedAt: article.lastUpdatedAt,
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

function getPublished<T extends { status: string; publishedAt: string }>(
  docsList: T[]
) {
  const docs =
    process.env.NODE_ENV === "development"
      ? docsList
      : docsList.filter((a) => a.status === "published");

  return docs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  );
}

export function getPublishedArticles() {
  return getPublished(allArticles)
    .map(getPartialArticles)
    .filter((a) => a.articleType === "article");
}

export function getPublishedNotes() {
  return getPublished(allArticles)
    .map(getPartialArticles)
    .filter((a) => a.articleType === "note");
}

export type PartialArticle = ReturnType<typeof getPartialArticles>;
export type PartialSeries = ReturnType<typeof generateSeries>;
