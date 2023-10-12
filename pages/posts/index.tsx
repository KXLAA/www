import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { api } from "@/lib/api";

type PostsPageProps = {
  posts: Array<PostType>;
};

export default (props: PostsPageProps) => {
  return (
    <Layout
      className="flex flex-col items-center w-full min-h-screen gap-8 p-10 bg-gray-dark-1 text-gray-dark-12"
      customMeta={{
        title: `Kola | Writing`,
        description: `Articles on web development, React  & any other interesting topics.`,
      }}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">All Writing</h2>

        <div className="flex flex-col gap-1">
          {props.posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="flex gap-3 px-0 py-2 text-2xl"
                data-splitbee-event={`Click on ${post.title}`}
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-2xl font-medium transition-colors text-gray-dark-11 hover:text-gray-dark-10">
                    {post.title}
                  </p>
                  <p className="text-base font-light text-gray-dark-10">
                    {post.description}
                  </p>

                  <div className="flex gap-1 text-sm font-medium text-gray-dark-10">
                    {post.publishedAt}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="self-start text-lg font-semibold transition-all text-orange-dark-10 hover:text-orange-dark-9"
        >
          Back Home
        </Link>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      posts: api.posts.minimal,
    },
  };
};
