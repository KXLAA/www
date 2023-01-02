import type { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { getMinimalPostDetails } from "@/lib/api";
import type { MetaProps } from "@/lib/seo";

type PostsPageProps = {
  posts: PostType[];
};

export default function PostsPage(props: PostsPageProps) {
  const posts = React.useMemo(
    () => groupPostsByYear(props.posts),
    [props.posts]
  );

  const meta: MetaProps = {
    title: `Posts | Kolade Afode`,
    description: "Posts by Kolade Afode",
    canonical: `https://kxlaa.com/posts`,
    openGraph: {
      title: `Posts | Kolade Afode`,
      description: "Posts by Kolade Afode",
      url: `https://kxlaa.com/posts`,
      type: "website",
      images: [],
    },
  };

  return (
    <Layout customMeta={meta}>
      <div className="flex flex-col gap-24 px-10 py-16">
        {Object.entries(posts).map(([year, posts]) => (
          <div
            className="flex flex-col w-full gap-4 transition-colors rounded-2xl"
            key={year}
          >
            <div className="w-full text-5xl font-bold">{year}</div>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <Link
                  className="text-[36px] font-light hover:underline underline-offset-4 decoration-blue-500"
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

function groupPostsByYear(posts: PostType[]): Record<string, PostType[]> {
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, PostType[]>);
  return postsByYear;
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return {
    props: { posts: getMinimalPostDetails(posts) },
  };
};
