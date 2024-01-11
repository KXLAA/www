import {
  defineDocumentType,
  defineNestedType,
} from "contentlayer/source-files";
import { format } from "date-fns";
import readingTime from "reading-time";

import { getHeadings, getSlug } from "./_shared";

export const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    course: { type: "nested", of: Course },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    og: { type: "string", required: true },
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => format(new Date(doc.publishedAt), "MMMM d, yyyy"),
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

const Course = defineNestedType(() => ({
  name: "Course",
  fields: {
    title: { type: "string", required: true },
    order: { type: "number", required: true },
  },
}));
