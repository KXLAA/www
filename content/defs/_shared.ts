import { DocumentGen } from "contentlayer/core";

export function getSlug(doc: DocumentGen) {
  return doc._raw.sourceFileName.replace(/\.mdx$/, "");
}

export const CONTENT_DIR_PATH = "content";
