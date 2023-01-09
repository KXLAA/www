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
      <div className="flex flex-col justify-center max-w-5xl gap-24 px-10 py-16 m-auto">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold text-8xl">Kolade Afode</h1>
          <h2 className="text-4xl !text-blue-500 font-medium">
            Engineer / Designer
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold">Recent Posts</h3>
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="text-[36px] font-light hover:underline underline-offset-4 decoration-blue-500"
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
          <h3 className="text-3xl font-bold">Projects</h3>
          <a
            href={`https://www.nartefacts.com/`}
            className="text-[40px] font-light hover:underline"
          >
            Nartefacts
          </a>
          <a
            href={`https://www.devportfolios.dev/`}
            className="text-[40px] font-light hover:underline"
          >
            DevPortfolios
          </a>
        </div>
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
