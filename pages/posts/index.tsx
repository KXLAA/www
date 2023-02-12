import type { GetStaticProps } from "next";
import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { prepare } from "@/lib/api";
import { formatDate } from "@/lib/date";

type PostsProps = {
  posts: PostType[];
};

export default function Posts(props: PostsProps) {
  const { posts } = props;
  return (
    <Layout
      className="flex flex-col max-w-3xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      key="home-page"
      customMeta={{
        title: `Kola | Articles`,
        description: `Sharing experiences, knowledge and videos on design & tech.`,
      }}
    >
      <Link
        href="/"
        className="px-2 py-1 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        BACK
      </Link>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <ArticleCard {...post} key={post.slug} />
        ))}
      </div>
      <Footer />
    </Layout>
  );
}

type ArticleCardProps = {
  title?: string;
  description?: string;
  image?: string;
  slug: string;
  publishedAt: string;
};

function ArticleCard(props: ArticleCardProps) {
  const { title, slug, description, publishedAt } = props;

  return (
    <Link
      className="flex gap-3 p-3 transition-colors rounded-md hover:bg-cod-gray-500"
      href={`/posts/${slug}`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm text-silver-800">{description}</p>

        <p className="mt-1 text-xs text-silver-900">
          {formatDate(publishedAt, "MM/dd/yyyy")}
        </p>
      </div>
    </Link>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: prepare.posts(allPosts),
    },
  };
};
