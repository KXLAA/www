import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { Header } from "@/components/home/Header";
import type { Post as PostType } from "@/contentlayer/generated";
import { api } from "@/lib/api";

type PostsPageProps = {
  posts: Array<PostType>;
};

export default (props: PostsPageProps) => {
  return (
    <Layout
      className="flex flex-col justify-center max-w-lg gap-6 px-4 py-4 text-base md:px-8 md:py-8 md:text-xl font-extralight"
      customMeta={{
        title: `Kola | Articles`,
        description: `Articles on web development, React  & any other interesting topics.`,
      }}
    >
      <Header heading="Writing." subheading="My thoughts on Web Development" />

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
                <p className="text-lg font-medium transition-colors text-silver-600 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy">
                  {post.title}
                </p>
                <p className="text-base font-extralight text-silver-700">
                  {post.description}
                </p>
                <p className="mt-2 text-xs font-normal text-silver-900">
                  {post.publishedAt}
                </p>
              </div>
            </Link>
          </article>
        ))}
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

{
  /* <span className="text-xs font-extralight text-silver-900">
Last updated: {props.posts[0].publishedAt}
</span> */
}
