import * as fs from "node:fs/promises";
import path from "node:path";

import type { DocumentGen } from "contentlayer/core";

import type { Post as PostType } from "@/contentlayer/generated";

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

export function getMinimalPostDetails(posts: PostType[]) {
  return posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    publishedAt: p.publishedAt,
  }));
}
