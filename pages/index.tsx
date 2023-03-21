import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import { ExperimentCard } from "@/components/experiments/ExperimentCard";
import type {
  Experiment as ExperimentsType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import { api } from "@/lib/api";
import { cx } from "@/lib/cx";
import { formatDate } from "@/lib/date";
import { useCopyEmail } from "@/lib/hooks/use-copy-email";
import generateRSS from "@/lib/rss";

type HomePageProps = {
  posts: PostType[];
  experiments: ExperimentsType[];
  projects: ProjectType[];
};

export default function HomePage(props: HomePageProps) {
  const { copyEmail, copied } = useCopyEmail();

  return (
    <Layout className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-semibold">KOLA</h1>
        <p className="text-base">
          Design-minded frontend engineer with hands on experience in building
          client- and server-side web applications.
        </p>

        <div className="flex gap-4">
          <motion.button
            className="flex items-center justify-center gap-1 px-4 py-1 text-sm font-semibold transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:bg-cod-gray-600 hover:border-cod-gray-400"
            onClick={copyEmail}
            data-splitbee-event="Click on Copy E-mail"
            whileTap={{ scale: 0.95 }}
          >
            <Copy className="w-3 h-3 text-silver-700" />

            <span className="text-xs text-silver-700">
              {copied ? "Copied" : "E-mail"}
            </span>
          </motion.button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {props.projects.map((project) => (
          <a
            key={project.url}
            href={project.url}
            className="flex flex-col w-full gap-3 overflow-hidden transition-colors border rounded-md bg-cod-gray-600 border-cod-gray-400 hover:border-cod-gray-200"
            target="_blank"
            rel="noreferrer"
            data-splitbee-event={`Click on ${project.title}`}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={2000}
              height={630}
            />
            <div className="flex flex-col justify-center gap-1 p-2 pt-0 text-sm font-light">
              <span>{project.title}</span>

              <span className="text-xs text-silver-700">
                {project.description}
              </span>
            </div>
          </a>
        ))}
      </div>

      <Section
        heading="Writing"
        description="Articles on web development, React  & any other interesting topics."
      >
        <div className="flex flex-col gap-2">
          {props.posts.slice(0, 3).map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="flex gap-3 p-2 transition-colors border border-transparent rounded-md md:p-3 hover:bg-cod-gray-500 hover:border-cod-gray-400"
              data-splitbee-event={`Click on ${post.title}`}
              data-splitbee-event-contentType="Article"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold">{post.title}</p>
                <p className="mt-0.5 text-xs text-[10px] font-normal text-silver-900">
                  {formatDate(post.publishedAt, "MM/dd/yyyy")}
                </p>
              </div>
            </Link>
          ))}

          <Show when={props.posts.length > 3}>
            <Link
              href="/posts"
              className="py-2 text-xs font-semibold text-center transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:border-cod-gray-400"
              data-splitbee-event="Click on All Articles"
            >
              All Articles
            </Link>
          </Show>
        </div>
      </Section>

      <Section
        heading="Experiments"
        description="Recreating some of my favorite ui interactions & building new
        prototypes."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {props.experiments.slice(0, 2).map((experiment) => (
            <React.Fragment key={experiment.slug}>
              <ExperimentCard {...experiment} size="sm" />
              <Show when={props.experiments.length === 1}>
                <div
                  className={cx(
                    "group relative flex  items-center justify-center gap-1.5 overflow-hidden transition-colors border rounded-md p-4 md:p-0 ",
                    "border-cod-gray-300 hover:border-cod-gray-400 bg-cod-gray-500 text-sm text-silver-600 hover:text-silver-800"
                  )}
                >
                  More Coming Soon
                </div>
              </Show>
            </React.Fragment>
          ))}
        </div>

        <Show when={props.experiments.length >= 2}>
          <Link
            href="/experiments"
            className="py-2 text-xs font-semibold text-center transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:border-cod-gray-400"
            data-splitbee-event="Click on All Experiments"
          >
            All Experiments
          </Link>
        </Show>
      </Section>

      <Footer />
    </Layout>
  );
}

function Section(props: {
  heading: string;
  description: string;
  children: React.ReactNode;
}) {
  const { heading, description, children } = props;
  return (
    <div className="flex flex-col gap-4 p-3 border rounded-md md:p-4 border-cod-gray-400">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold">{heading}</p>
        <p className="text-xs text-silver-700">{description}</p>
      </div>

      {children}
    </div>
  );
}

export const getStaticProps = async () => {
  await generateRSS();

  return {
    props: {
      posts: api.posts.minimal,
      experiments: api.experiments.minimal,
      projects: api.projects,
    },
  };
};
