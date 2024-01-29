import { defineDocumentType } from "contentlayer/source-files";
import { format } from "date-fns";
import { getSlug } from "./_shared";

export const UI = defineDocumentType(() => ({
  name: "UI",
  filePathPattern: `ui/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    og: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => format(new Date(doc.publishedAt), "MMMM d, yyyy"),
    },
    slug: {
      type: "string",
      resolve: (doc) => getSlug(doc),
    },
  },
}));
