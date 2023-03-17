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

export type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
};

type Config = {
  experiments: ExperimentsType[];
  posts: PostType[];
  projects: Project[];
};

class Api {
  private readonly _experiments: ExperimentsType[];
  private readonly _posts: PostType[];
  private readonly _projects: Project[];

  constructor({ experiments, posts, projects }: Config) {
    this._experiments = experiments;
    this._posts = posts;
    this._projects = projects;
  }

  private sort<T extends { publishedAt: string }>(content: T[]) {
    return content.sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );
  }

  private getPublished<T extends { slug: string }>(content: T[]) {
    return content.filter((c) => !c.slug.startsWith("_"));
  }

  get posts() {
    return {
      published: this.getPublished(this._posts),
      minimal: pipe(this._posts, this.getPublished, this.sort, (posts) =>
        posts.map((p) => ({
          title: p.title,
          slug: p.slug,
          description: p.description,
          publishedAt: p.publishedAt,
        }))
      ),
    };
  }

  get experiments() {
    return {
      published: this.getPublished(this._experiments),
      minimal: pipe(
        this._experiments,
        this.getPublished,
        this.sort,
        (experiments) =>
          experiments.map((e) => ({
            title: e.title,
            slug: e.slug,
            publishedAt: e.publishedAt,
            mp4: e.mp4,
            webm: e.webm,
            poster: e.poster,
          }))
      ),
    };
  }

  get projects() {
    return this._projects;
  }
}

export const api = new Api({
  experiments: allExperiments,
  posts: allPosts,
  projects: [
    {
      title: "Nartefacts",
      description:
        "Color pallette's inspired by the vibrant colors of African music.",
      link: "https://www.nartefacts.com/",
      image: "https://ucarecdn.com/85a59495-37d7-4fd0-b128-482cdbf43445/",
    },
    {
      title: "DevPortfolios",
      description: "The most beautiful developer portfolios on the web.",
      link: "https://www.devportfolios.dev/",
      image: "https://ucarecdn.com/4d9faa95-0f9d-4889-b6a4-f3e2ecd5adf0/",
    },
  ],
});
