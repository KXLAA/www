import { compareDesc } from "date-fns";
import { pipe } from "fp-ts/function";

import type {
  Experiment as ExperimentsType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import {
  allExperiments as experiments,
  allPosts as posts,
  allProjects as projects,
} from "@/contentlayer/generated";
import { pick } from "@/lib/pick";

export type PostHeading = {
  id?: string;
  content?: string;
  link?: string;
  level?: number;
};

type Config = {
  experiments: ExperimentsType[];
  posts: PostType[];
  projects: ProjectType[];
};

class Api {
  private readonly _experiments: ExperimentsType[];
  private readonly _posts: PostType[];
  private readonly _projects: ProjectType[];

  constructor({ experiments, posts, projects }: Config) {
    this._experiments = experiments;
    this._posts = posts;
    this._projects = projects;
  }

  private sort<T extends { publishedAt: string }>(content: T[]) {
    return content.sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    );
  }

  private getPublished<T extends { slug: string }>(content: T[]) {
    return content.filter((c) => !c.slug.startsWith("_"));
  }

  get posts() {
    return {
      published: this.getPublished(this._posts),
      minimal: pipe(this._posts, this.getPublished, this.sort, (posts) =>
        posts.map((p) =>
          pick(p, ["title", "slug", "publishedAt", "description"])
        )
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
          experiments.map((e) =>
            pick(e, ["title", "slug", "publishedAt", "mp4", "webm", "poster"])
          )
      ),
    };
  }

  get projects() {
    return this._projects;
  }
}

export const api = new Api({ experiments, posts, projects });
