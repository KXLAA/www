import * as fs from "node:fs/promises";
import path from "node:path";

import type { DocumentGen } from "contentlayer/core";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const contentDirPath = "content";

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

async function getLastEditedDate(doc: DocumentGen): Promise<Date> {
  const stats = await fs.stat(
    path.join(contentDirPath, doc._raw.sourceFilePath)
  );
  return stats.mtime;
}

const getSlug = (doc: any) => doc._raw.sourceFileName.replace(/\.mdx$/, "");

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    og: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    image: {
      type: "string",
      resolve: (doc) => `/posts/${getSlug(doc)}/image.png`,
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
      of: defineNestedType(() => ({
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
      })),
      resolve: (doc) => getHeadings(doc.body.raw),
    },
    slug: {
      type: "string",
      resolve: (doc) => getSlug(doc),
    },
  },
}));

const Experiment = defineDocumentType(() => ({
  name: "Experiment",
  filePathPattern: `experiments/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    number: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string" },
    og: { type: "string", required: true },
    mp4: { type: "string", required: true },
    webm: { type: "string", required: true },
    poster: { type: "string", required: true },
    articleLink: { type: "string" },
    codesandbox: {
      type: "string",
    },
    github: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => getSlug(doc),
    },
  },
}));

const Project = defineDocumentType(() => ({
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

const rehypePrettyCodeOptions = {
  // use a prepackaged theme, see all themes here:
  // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
  theme: "github-dark-dimmed",
  onVisitHighlightedLine(node: any) {
    node.properties.className.push("line--highlighted");
  },
};

const rehypeAutolinkHeadingsOptions = {
  properties: {
    className: ["anchor"],
  },
};

export default makeSource({
  contentDirPath: contentDirPath,
  documentTypes: [Post, Experiment, Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
    ],
  },
});
