import { pipe } from "fp-ts/function";

import type {
  Experiments as ExperimentsType,
  Post as PostType,
} from "@/contentlayer/generated";
import { allExperiments, allPosts } from "@/contentlayer/generated";

export type PostHeading = {
  id?: string;
  content?: string;
  link?: string;
  level?: number;
};

type Config = {
  experiments: ExperimentsType[];
  posts: PostType[];
};

class Api {
  private experiments: ExperimentsType[];
  private posts: PostType[];

  constructor({ experiments, posts }: Config) {
    this.experiments = experiments;
    this.posts = posts;
  }

  getPublished<T extends { slug: string }>(content: T[]) {
    return content.filter((c) => !c.slug.startsWith("_"));
  }

  sort<T extends { publishedAt: string }>(content: T[]) {
    return content.sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );
  }

  getPublishedPosts() {
    return this.getPublished(this.posts);
  }

  getPublishedExperiments() {
    return this.getPublished(this.experiments);
  }

  getMinimalPosts() {
    return pipe(this.posts, this.getPublished, this.sort, (posts) =>
      posts.map((p) => ({
        title: p.title,
        slug: p.slug,
        description: p.description,
        publishedAt: p.publishedAt,
      }))
    );
  }

  getMinimalExperiments() {
    return pipe(this.experiments, this.getPublished, this.sort, (experiments) =>
      experiments.map((e) => ({
        title: e.title,
        slug: e.slug,
        publishedAt: e.publishedAt,
      }))
    );
  }
}

export const api = new Api({
  experiments: allExperiments,
  posts: allPosts,
});
