import type { Post as PostType } from ".contentlayer/generated";

export interface MetaProps
  extends Partial<Pick<PostType, "description" | "thumbnail" | "title">> {
  /**
   * For the meta tag `og:type`
   */
  type?: string;
  date?: string;
}
