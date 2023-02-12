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
