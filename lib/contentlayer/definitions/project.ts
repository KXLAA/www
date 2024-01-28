import { defineDocumentType } from "contentlayer/source-files";

import { getSlug } from "./_shared";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    time: { type: "string", required: true },
    url: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => getSlug(doc),
    },
    image: {
      type: "string",
      resolve: (doc) => `/projects/${getSlug(doc)}/image.png`,
    },
  },
}));
