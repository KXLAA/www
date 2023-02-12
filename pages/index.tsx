import { Copy } from "lucide-react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import { ExperimentCard } from "@/components/experiments/common/ExperimentCard";
import { ProjectCard } from "@/components/home/ProjectCard";
import { Section } from "@/components/home/Section";
import { useCopyEmail } from "@/components/home/use-copy-email";
import type {
  Experiments as ExperimentsType,
  Post as PostType,
} from "@/contentlayer/generated";
import { allExperiments, allPosts } from "@/contentlayer/generated";
import { getMinimalPostDetails } from "@/lib/api";
import { formatDate } from "@/lib/date";

type HomeProps = {
  posts: PostType[];
  experiments: ExperimentsType[];
};

export default function Home(props: HomeProps) {
  const { copyEmail, copied } = useCopyEmail();

  return (
    <Layout
      className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      key="home-page"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-semibold">KOLA</h1>
        <p className="text-base">
          Design-minded full-stack engineer with experience in building client-
          and server-side web applications.
        </p>

        <div className="flex gap-4">
          {/* <button className="px-4 py-1 text-sm font-semibold transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:bg-cod-gray-600 hover:border-cod-gray-400">
            About
          </button> */}

          <button
            className="flex items-center justify-center gap-1 px-4 py-1 text-sm font-semibold transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:bg-cod-gray-600 hover:border-cod-gray-400"
            onClick={copyEmail}
          >
            <Copy className="w-3 h-3 text-silver-700" />

            <span className="text-xs text-silver-700">
              {copied ? "Copied" : "E-mail"}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold">PROJECTS</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <ProjectCard
            link="https://www.nartefacts.com/"
            title="Nartefacts"
            image="https://ucarecdn.com/85a59495-37d7-4fd0-b128-482cdbf43445/"
            description="Color pallette's inspired by the vibrant colors of African music."
          />

          <ProjectCard
            link="https://www.devportfolios.dev/"
            title="DevPortfolios"
            image="https://ucarecdn.com/4d9faa95-0f9d-4889-b6a4-f3e2ecd5adf0/"
            description="The most beautiful developer portfolios on the web."
          />
        </div>
      </div>

      <Section
        heading="Writing"
        description="Sharing experiences, knowledge and videos on design & tech."
      >
        <div className="flex flex-col gap-2">
          {props.posts.slice(0, 3).map((post) => (
            <>
              <Link
                href={`/posts/${post.slug}`}
                key={post.slug}
                className="flex gap-3 p-3 transition-colors rounded-md hover:bg-cod-gray-500"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">{post.title}</p>
                  <p className="mt-0.5 text-xs text-[10px] font-normal text-silver-900">
                    {formatDate(post.publishedAt, "MM/dd/yyyy")}
                  </p>
                </div>
              </Link>
            </>
          ))}

          <Show when={props.posts.length > 3}>
            <Link
              href="/posts"
              className="py-2 text-xs font-semibold text-center transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:border-cod-gray-400"
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
            <ExperimentCard {...experiment} key={experiment.slug} size="sm" />
          ))}
        </div>

        <Link
          href="/experiments"
          className="py-2 text-xs font-semibold text-center transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:border-cod-gray-400"
        >
          All Experiments
        </Link>
      </Section>

      <Footer />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );

  return {
    props: {
      posts: getMinimalPostDetails(posts),
      experiments: allExperiments,
    },
  };
};
