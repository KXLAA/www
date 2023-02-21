import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/date";

type PostsPageProps = {
  posts: PostType[];
};

export default function Posts(props: PostsPageProps) {
  return (
    <Layout
      className="flex flex-col max-w-3xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      customMeta={{
        title: `Kola | Articles`,
        description: `Articles on web development, React  & any other intresting topics.`,
      }}
    >
      <Link
        href="/"
        className="px-2 py-1 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        BACK
      </Link>

      <div className="flex flex-col gap-4">
        {props.posts.map((post) => (
          <Link
            className="flex gap-3 p-3 transition-colors border border-transparent rounded-md hover:bg-cod-gray-500 hover:border-cod-gray-400"
            href={`/posts/${post.slug}`}
            key={post.slug}
          >
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">{post.title}</p>
              <p className="text-sm text-silver-800">{post.description}</p>

              <p className="mt-1 text-xs text-silver-900">
                {formatDate(post.publishedAt, "MM/dd/yyyy")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      posts: api.getMinimalPosts(),
    },
  };
};
