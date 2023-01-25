/* eslint-disable react/no-unescaped-entities */
import { ChevronRightIcon } from "@radix-ui/react-icons";
import type { GetStaticProps } from "next";
import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { getMinimalPostDetails } from "@/lib/api";

type HomeProps = {
  posts: PostType[];
};

export default function Home(props: HomeProps) {
  const posts = props.posts;

  return (
    <Layout hideHeader>
      <div className="flex flex-col justify-center max-w-4xl px-10 py-16 gap-14">
        <div className="flex px-4 py-2 text-2xl font-bold rounded bg-shark-800 w-fit">
          <p>kxlaa</p>
        </div>

        <div className="flex flex-col gap-8 text-3xl font-extralight">
          <p>
            Hello, I'm Kola. A Typescript Engineer with hands on experience in
            building client & server-side web applications using Typescript.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="p-2 text-2xl font-normal border-l-4 bg-gradient-to-r from-shark-800 border-shark-700">
            WRITING
          </h3>
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="text-3xl font-extralight hover:underline underline-offset-4 decoration-blue-500 "
            >
              {post.title}
            </Link>
          ))}

          <Show when={posts.length > 6}>
            <Link
              href="/posts"
              className="mt-6 text-xl text-blue-500 transition-colors hover:text-blue-700"
            >
              See all posts
              <ChevronRightIcon
                className="inline-block w-5 h-5 ml-2 -mr-1"
                aria-hidden="true"
              />
            </Link>
          </Show>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="p-2 text-2xl font-light border-l-4 bg-gradient-to-r from-shark-800 border-shark-700">
            PROJECTS
          </h3>
          <a
            href={`https://www.nartefacts.com/`}
            className="text-3xl font-extralight hover:underline underline-offset-4 decoration-blue-500"
          >
            Nartefacts
          </a>
          <a
            href={`https://www.devportfolios.dev/`}
            className="text-3xl font-extralight hover:underline underline-offset-4 decoration-blue-500"
          >
            DevPortfolios
          </a>
        </div>

        {/* <div className="flex flex-col gap-4">
          <h3 className="p-2 text-2xl font-light border-l-4 bg-gradient-to-r from-shark-800 border-shark-700">
            EXPERIMENTS
          </h3>
          <a
            href={`https://www.nartefacts.com/`}
            className="text-3xl font-extralight hover:underline underline-offset-4 decoration-blue-500"
          >
            Drag and Drop
          </a>
          <a
            href={`https://www.devportfolios.dev/`}
            className="text-3xl font-extralight hover:underline underline-offset-4 decoration-blue-500"
          >
            Animated Collision
          </a>
        </div> */}
      </div>
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
