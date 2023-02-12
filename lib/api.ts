import * as fs from "node:fs/promises";
import path from "node:path";

import type { DocumentGen } from "contentlayer/core";
import { pipe } from "fp-ts/function";

import type {
  Experiments as ExperimentsType,
  Post as PostType,
} from "@/contentlayer/generated";

export type PostHeading = {
  id?: string;
  content?: string;
  link?: string;
  level?: number;
};

export function getHeadings(source: string): PostHeading[] {
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

export const contentDirPath = "content";

export async function getLastEditedDate(doc: DocumentGen): Promise<Date> {
  const stats = await fs.stat(
    path.join(contentDirPath, doc._raw.sourceFilePath)
  );
  return stats.mtime;
}

function getPublished<T extends { slug: string }>(content: T[]) {
  return content.filter((c) => !c.slug.startsWith("_"));
}

function sort<T extends { publishedAt: string }>(content: T[]) {
  return content.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );
}

function preparePosts(posts: PostType[]) {
  return pipe(posts, getPublished, sort, (posts) =>
    posts.map((p) => ({
      title: p.title,
      slug: p.slug,
      description: p.description,
      publishedAt: p.publishedAt,
    }))
  );
}

function prepareExperiments(experiments: ExperimentsType[]) {
  return pipe(experiments, getPublished, sort, (experiments) =>
    experiments.map((e) => ({
      title: e.title,
      slug: e.slug,
      mp4: e.mp4,
      webm: e.webm,
      publishedAt: e.publishedAt,
    }))
  );
}

export const prepare = {
  posts: preparePosts,
  experiments: prepareExperiments,
};
