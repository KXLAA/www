import { defineDocumentType } from "contentlayer/source-files";
import { format } from "date-fns";
import readingTime from "reading-time";

import {
  getHeadings,
  getLastEditedDate,
  getSlug,
  isOldArticle,
} from "./_shared";
import { Series } from "./series";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    series: { type: "nested", of: Series },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    og: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    articleType: {
      type: "enum",
      options: ["article", "note"],
      required: true,
    },
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => format(new Date(doc.publishedAt), "MMMM d, yyyy"),
    },
    dates: {
      type: "json",
      resolve: (doc) => isOldArticle(doc.publishedAt),
    },
    lastUpdatedAt: {
      type: "string",
      resolve: (doc) => getLastEditedDate(doc),
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    headings: {
      type: "json",
      resolve: (doc) => getHeadings(doc.body.raw),
    },
    slug: {
      type: "string",
      resolve: (doc) => getSlug(doc),
    },
  },
}));
