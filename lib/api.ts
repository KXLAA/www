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
import { formatDate } from "@/lib/date";
import { pick } from "@/lib/pick";

export type PostHeading = {
  id?: string;
  content?: string;
  link?: string;
  level?: number;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  href: string;
  date: string;
};

type Config = {
  posts: Array<PostType>;
  experiments: Array<ExperimentsType>;
  projects: Array<ProjectType>;
};

type DateFormat = "long" | "short" | "year";

class Api {
  private readonly _experiments: Array<ExperimentsType>;
  private readonly _posts: Array<PostType>;
  private readonly _projects: Array<ProjectType>;

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

  private formatDate<T extends { publishedAt: string }>(
    content: T[],
    format?: DateFormat
  ) {
    return content.map((c) => ({
      ...c,
      publishedAt: formatDate(
        c.publishedAt,
        {
          long: "MMMM dd, yyyy",
          short: "MM/dd/yyyy",
          year: "yyyy",
        }[format || "short"]
      ),
    }));
  }

  get posts() {
    return {
      published: pipe(this._posts, this.sort, this.getPublished, (posts) =>
        this.formatDate(posts, "long")
      ),
      minimal: pipe(
        this._posts,
        this.getPublished,
        this.sort,
        (posts) => this.formatDate(posts, "long"),
        (posts) =>
          posts.map((p) =>
            pick(p, ["title", "slug", "publishedAt", "description"])
          )
      ),
    };
  }

  get experience() {
    return [
      {
        role: "Software Engineer",
        company: "Starling Bank",
        location: "London, UK",
        href: "https://www.starlingbank.com/",
        date: "Apr 2023 - Present",
      },
      {
        role: "Full Stack Engineer",
        company: "Super",
        location: "Remote",
        href: "https://super.so/",
        date: "Mar 2022 - Apr 2023",
      },
    ];
  }

  get contacts() {
    return [
      {
        name: "Twitter",
        href: "https://twitter.com/kxlaa_",
      },
      {
        name: "GitHub",
        href: "https://github.com/KXLAA",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/kxlaa/",
      },
      {
        name: "Email",
        href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
      },
    ];
  }

  get experiments() {
    return {
      published: pipe(this._experiments, this.sort, this.getPublished),
      minimal: pipe(
        this._experiments,
        this.getPublished,
        this.sort,
        (experiment) => this.formatDate(experiment, "long"),
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
