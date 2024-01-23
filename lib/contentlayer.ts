import { compareDesc } from "date-fns";

import {
  allArticles,
  allNotes,
  Article,
  Note,
  Series,
} from "@/contentlayer/generated";

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
  return getPublished(allArticles).map(getPartialArticles);
}

function getPartialNotes(note: Note) {
  return {
    title: note.title,
    og: note.og,
    slug: note.slug,
    publishedAt: note.publishedAt,
    updatedAt: note.updatedAt,
    description: note.description,
    body: {
      code: note.body.code,
    },
    headings: note.headings,
    tags: note.tags,
  };
}

export function getPublishedNotes() {
  return getPublished(allNotes).map(getPartialNotes);
}

export type PartialArticle = ReturnType<typeof getPartialArticles>;

export type PartialSeries = ReturnType<typeof generateSeries>;

export type PartialNote = ReturnType<typeof getPartialNotes>;
