import { compareDesc } from "date-fns";
import { pipe } from "fp-ts/function";

import type {
  Experiment as ExperimentsType,
  Note as NoteType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import {
  allExperiments as experiments,
  allNotes as notes,
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
  notes: Array<NoteType>;
};

type DateFormat = "long" | "short" | "year";

class Api {
  private readonly _experiments: Array<ExperimentsType>;
  private readonly _posts: Array<PostType>;
  private readonly _projects: Array<ProjectType>;
  private readonly _notes: Array<NoteType>;

  constructor({ experiments, posts, projects, notes }: Config) {
    this._experiments = experiments;
    this._posts = posts;
    this._projects = projects;
    this._notes = notes;
  }

  private sort<T extends { publishedAt: string }>(content: T[]) {
    return content.sort((a, b) =>
      compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
    );
  }

  private getPublished<T extends { slug: string }>(content: T[]) {
    //ony filter out unpublished content when in prod
    if (process.env.NODE_ENV === "production") {
      return content.filter((c) => !c.slug.startsWith("_"));
    }

    return content;
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

  get notes() {
    return {
      published: pipe(this._notes, this.sort, this.getPublished, (notes) =>
        this.formatDate(notes, "long")
      ),
      minimal: pipe(
        this._notes,
        this.getPublished,
        this.sort,
        (notes) => this.formatDate(notes, "long"),
        (notes) =>
          notes.map((n) =>
            pick(n, ["title", "slug", "publishedAt", "description"])
          )
      ),
    };
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

  get experiments() {
    return {
      published: pipe(
        this._experiments,
        this.sort,
        this.getPublished,
        (experiment) => this.formatDate(experiment, "long")
      ),
      minimal: pipe(
        this._experiments,
        this.getPublished,
        this.sort,
        (experiment) => this.formatDate(experiment, "long"),
        (experiments) =>
          experiments.map((e) =>
            pick(e, [
              "title",
              "slug",
              "publishedAt",
              "mp4",
              "webm",
              "poster",
              "description",
            ])
          )
      ),
    };
  }

  get projects() {
    return this._projects;
  }
}

export const api = new Api({ experiments, posts, projects, notes });
