import * as fs from "node:fs/promises";
import path from "node:path";

import type { DocumentGen } from "contentlayer/core";
import { defineDocumentType } from "contentlayer/source-files";
import { format } from "date-fns";
import readingTime from "reading-time";

import { CONTENT_DIR_PATH, getSlug } from "./_shared";
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
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => formatDate(doc.publishedAt, "MMMM d, yyyy"),
    },
    image: {
      type: "string",
      resolve: (doc) => `/articles/${getSlug(doc)}/image.png`,
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

function formatDate(date: string, formatStr: string) {
  return format(new Date(date), formatStr);
}

function getHeadings(source: string) {
  //get all heading levels from markdown source, including #, ##, ###, etc.
  const headings = source.match(/#+\s(.*?)\n/g);

  //return array of objects with heading names and ids
  return (
    headings?.map((h, i) => {
      const content = h.match(/#+\s(.*?)\n/)?.[1];
      const type = headings?.[i].match(/#+/)?.[0];
      const slug = content?.replace(/ /g, "-").toLowerCase();
      const link = "#" + slug;
      return {
        id: slug || "",
        content: content || "",
        link: link || "",
        level: type?.length || 0,
      };
    }) || []
  );
}

async function getLastEditedDate(doc: DocumentGen) {
  const stats = await fs.stat(
    path.join(CONTENT_DIR_PATH, doc._raw.sourceFilePath)
  );
  return stats.mtime;
}
