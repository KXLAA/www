import type { GetStaticProps } from "next";
import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { getMinimalPostDetails } from "@/lib/api";

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

      <div className="grid grid-cols-2 gap-4">
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
};

function ArticleCard(props: ArticleCardProps) {
  const { title, slug } = props;
  return (
    <Link className="flex flex-col w-full gap-2" href={`/posts/${slug}`}>
      <div className="w-full h-40 border rounded border-cod-gray-400 bg-cod-gray-600" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{title || "Article Title"}</p>
        <p className="text-xs text-silver-800">React</p>
      </div>
    </Link>
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
