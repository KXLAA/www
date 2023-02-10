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
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
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

const ExperimentLink = defineNestedType(() => ({
  name: "Link",
  fields: {
    github: {
      type: "string",
    },
    codesandbox: {
      type: "string",
    },
    url: {
      type: "string",
    },
  },
}));

export const Experiments = defineDocumentType(() => ({
  name: "Experiments",
  filePathPattern: `experiments/*.mdx`,
  contentType: "mdx",
  fields: {
    heading: { type: "string", required: true },
    mp4: { type: "string", required: true },
    webm: { type: "string", required: true },
    links: {
      type: "nested",
      of: ExperimentLink,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(".mdx", ""),
    },
  },
}));

export const Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: `projects/*.json`,
  contentType: "data",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    image: { type: "string", required: true },
    link: { type: "string", required: true },
  },
}));

export default makeSource({
  contentDirPath: contentDirPath,
  documentTypes: [Post, Experiments, Projects],
  mdx: {
    ...mdxOptions,
  },
});
