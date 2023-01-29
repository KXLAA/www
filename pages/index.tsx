/* eslint-disable react/no-unescaped-entities */
import {
  ChevronRightIcon,
  EnterFullScreenIcon,
  Half2Icon,
} from "@radix-ui/react-icons";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { getMinimalPostDetails } from "@/lib/api";

type HomeProps = {
  posts: PostType[];
};

type SectionProps = {
  heading: string;
  children: React.ReactNode;
};
function Section(props: SectionProps) {
  const { heading, children } = props;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="px-4 text-base font-bold rounded bg-shark-800 w-fit text-silver-600 shadow-border-shiny">
        {heading}
      </h3>
      {children}
    </div>
  );
}
export default function Home(props: HomeProps) {
  return (
    <Layout
      className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-lg md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      key="home-page"
    >
      <div className="flex flex-col gap-4">
        <p>
          Hello, I'm Kola, a design-minded full-stack engineer with experience
          in building client- and server-side web applications.
        </p>

        <p>
          I mainly work with Typescript and related web technologies, but I'm
          currently exploring the Go programming language.
        </p>
      </div>

      <Section heading="WRITING">
        {props.posts.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post.slug}
            className="transition-all hover:text-silver-900"
          >
            {post.title}
          </Link>
        ))}

        <Show when={props.posts.length > 6}>
          <Link
            href="/posts"
            className="mt-6 !text-sm text-blue-500 transition-all md:text-xl hover:text-blue-700"
          >
            See all posts
            <ChevronRightIcon
              className="inline-block w-5 h-5 ml-2 -mr-1"
              aria-hidden="true"
            />
          </Link>
        </Show>
      </Section>

      <Section heading="PROJECTS">
        <a
          href={`https://www.nartefacts.com/`}
          className="flex items-center gap-2 transition-all hover:text-silver-900"
        >
          <Half2Icon className="inline-block w-5 h-5" />
          Nartefacts
        </a>
        <a
          href={`https://www.devportfolios.dev/`}
          className="flex items-center gap-2 transition-all hover:text-silver-900"
        >
          <EnterFullScreenIcon className="inline-block w-5 h-5" />
          DevPortfolios
        </a>
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
    },
  };
};
