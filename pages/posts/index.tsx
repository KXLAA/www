import { Clock, Home } from "lucide-react";
import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { api } from "@/lib/api";

type PostsPageProps = {
  posts: Array<PostType>;
};

export default function Posts(props: PostsPageProps) {
  return (
    <Layout
      className="flex flex-col justify-center max-w-lg gap-6 px-4 py-4 text-base md:px-8 md:py-8 md:text-xl font-extralight"
      customMeta={{
        title: `Kola | Articles`,
        description: `Articles on web development, React  & any other interesting topics.`,
      }}
    >
      <Link
        href="/"
        className="flex gap-1 text-xs text-[10px] font-extralight text-silver-600 items-center transition-colors duration-200 hover:text-silver-900"
      >
        <Home className="w-3 h-3" strokeWidth={1.44} />
        <span>Home</span>
      </Link>

      <div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-silver-800">Blog</h2>

            <div className="flex gap-2">
              <span className="text-xs font-light text-silver-900">
                {props.posts.length} posts
              </span>

              <span className="text-xs font-light text-silver-900">·</span>

              <span className="text-xs font-extralight text-silver-900">
                Last updated: {props.posts[0].publishedAt}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {props.posts.map((post) => (
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
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      posts: api.posts.minimal,
    },
  };
};
