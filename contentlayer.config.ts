import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";

import { contentDirPath, getHeadings, getLastEditedDate } from "./lib/api";
import { mdxOptions } from "./lib/mdx-config";

const ReadingTime = defineNestedType(() => ({
  name: "readingTime",
  fields: {
    title: {
      type: "string",
    },
    text: {
      type: "string",
    },
    minutes: {
      type: "number",
    },
    time: {
      type: "number",
    },
    words: {
      type: "number",
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    // publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    ogImage: { type: "string" },
    thumbnail: { type: "string" },
    postId: { type: "string" },
    // publishedAt: { type: "string" },
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => getLastEditedDate(doc),
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
      type: "nested",
      of: ReadingTime,
      resolve: (doc) => getHeadings(doc.body.raw),
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(".mdx", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: contentDirPath,
  documentTypes: [Post],
  mdx: {
    ...mdxOptions,
  },
});
