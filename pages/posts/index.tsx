import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import type { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Layout } from "@/components/common/Layout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import type { MetaProps } from "@/types/layout";

type PostsPageProps = {
  posts: PostType[];
};

export default function PostsPage(props: PostsPageProps) {
  const posts = React.useMemo(
    () => groupPostsByYear(props.posts),
    [props.posts]
  );

  const customMeta: MetaProps = {
    title: `Kolade Afode - Writing`,
    description: "I write about things I learn and things I do.",
    thumbnail: ``,
  };

  return (
    <Layout customMeta={customMeta}>
      <div className="flex flex-col items-center gap-4">
        <BreadCrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Writing",
              active: true,
            },
          ]}
        />

        <div className="max-w-[600px] flex flex-col gap-4 w-full bg-shark-700 rounded-xl shadow-border-shiny">
          <div className="">
            {Object.entries(posts).map(([year, posts]) => (
              <div
                className="flex flex-col w-full gap-2 p-6 transition-colors rounded-2xl"
                key={year}
              >
                <div className="w-full text-3xl font-black">{year}</div>
                <div className="flex flex-col gap-2 overflow-hidden">
                  {posts.map((post) => (
                    <Link
                      className="flex gap-2 py-2 transition-colors border-b border-shark-400 hover:text-silver-700 last:border-none"
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                    >
                      <div className="self-start p-1 transition-colors duration-200 rounded-full shadow-border-shiny text-silver-700">
                        <ArrowTopRightIcon className="w-3 h-3" />
                      </div>
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
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
    props: { posts },
  };
};
