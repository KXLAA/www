import * as fs from "node:fs/promises";
import path from "node:path";

import { DocumentGen } from "contentlayer/core";
import { differenceInDays, format, formatDistanceToNowStrict } from "date-fns";

export function getSlug(doc: DocumentGen) {
  return doc._raw.sourceFileName.replace(/\.mdx$/, "");
}

export const CONTENT_DIR_PATH = "content";

export function getHeadings(source: string) {
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

export async function getLastEditedDate(doc: DocumentGen) {
  const stats = await fs.stat(
    path.join(CONTENT_DIR_PATH, doc._raw.sourceFilePath)
  );

  return format(new Date(stats.mtime), "MMMM d, yyyy");
}

export function isOldArticle(publishDate: string) {
  const today = new Date();
  const publish = new Date(publishDate);

  const diffDays = differenceInDays(today, publish);
  const relativeDate = formatDistanceToNowStrict(publish);

  return {
    isOld: diffDays > 30,
    relativeDate: relativeDate,
  };
}
