import type { PostType } from "./post";

export interface MetaProps
  extends Partial<
    Pick<PostType, "date" | "description" | "thumbnail" | "title">
  > {
  /**
   * For the meta tag `og:type`
   */
  type?: string;
}
