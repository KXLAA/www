import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Copy, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar } from "@/components/common/Avatar";
import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { Logo } from "@/components/common/Logo";
import { Show } from "@/components/common/Show";
import type {
  Experiment as ExperimentsType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import { api } from "@/lib/api";
import { cx } from "@/lib/cx";
// import { cx } from "@/lib/cx";
import { useCopyEmail } from "@/lib/hooks/use-copy-email";
import { useHover } from "@/lib/hooks/use-hover";
import generateRSS from "@/lib/rss";

type HomePageProps = {
  posts: PostType[];
  experiments: ExperimentsType[];
  projects: ProjectType[];
};

export default function HomePage(props: HomePageProps) {
  const { copyEmail, copied } = useCopyEmail();
  const [hoverRef, isHovered] = useHover<any>();

  return (
    <Layout className="flex flex-col justify-center max-w-lg gap-4 px-4 py-4 text-base md:px-8 md:py-8 md:gap-8 md:text-xl font-extralight">
      <div className="flex flex-col gap-4">
        <span className="flex gap-2 text-xs text-[10px] font-medium text-silver-900">
          <p>7:00:28 PM</p>
          <p>.</p>
          <p>London, UK 🇬🇧</p>
        </span>

        <div className="flex items-center gap-4">
          <Avatar />

          <div className="text-base font-normal">
            <p className="text-silver-600">Kolade Afode</p>
            <p className="text-sm text-silver-800">
              Frontend Engineer, London UK.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-silver-800" ref={hoverRef}>
          Selected Posts
        </h2>

        {props.posts.slice(0, 3).map((post) => (
          <article key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="flex gap-3 px-0 py-2"
              data-splitbee-event={`Click on ${post.title}`}
              data-splitbee-event-contentType="Article"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-normal underline text-silver-600 hover:decoration-dotted">
                  {post.title}
                </p>
                <p className="text-sm font-extralight text-silver-700">
                  {post.description}
                </p>

                <div className="flex items-center gap-1 font-extralight mt-0.5">
                  <Clock className="inline-block w-3 h-3 text-silver-900" />
                  <p className="text-xs font-normal text-silver-900">
                    {post.publishedAt}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}

        <Link
          href="/posts"
          className="text-xs font-bold underline text-silver-900 hover:decoration-dotted"
        >
          View all posts
        </Link>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-silver-800">
          Selected Projects
        </h2>

        <div className="flex flex-col gap-2">
          {props.projects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              className="flex gap-3 px-0 py-2"
              target="_blank"
              rel="noreferrer"
              data-splitbee-event={`Click on ${project.title}`}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <p className="text-base font-normal underline text-silver-600 hover:decoration-dotted">
                    {project.title}
                  </p>
                  <ArrowUpRight
                    className="w-5 h-5 text-silver-600"
                    strokeWidth={1.22}
                  />
                </div>

                <p className="text-sm font-extralight text-silver-700">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-silver-800">Contact </h2>

        <div className="flex flex-col gap-2"></div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  generateRSS();

  return {
    props: {
      posts: api.posts.minimal,
      experiments: api.experiments.minimal,
      projects: api.projects,
    },
  };
};

const CONTACTS = [
  {
    name: "Twitter",
    link: "https://twitter.com/kxlaa_",
    label: "kxlaa_",
  },
  {
    name: "GitHub",
    link: "https://github.com/KXLAA",
    label: "kxlaa",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/kxlaa/",
    label: "kxlaa",
  },
];
