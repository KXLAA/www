import {
  defineDocumentType,
  defineNestedType,
} from "contentlayer/source-files";
import { format } from "date-fns";

import { getHeadings, getLastEditedDate, getSlug } from "./_shared";

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
    tags: { type: "list", of: { type: "string" } },
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => format(new Date(doc.publishedAt), "MMMM d, yyyy"),
    },
    updatedAt: {
      type: "string",
      resolve: (doc) => getLastEditedDate(doc),
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
