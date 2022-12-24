import type { GetStaticProps } from "next";
import Link from "next/link";

import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Layout } from "@/components/common/Layout";
import { Section } from "@/components/common/Section";
import { formatDate } from "@/lib/date";
import type { MetaProps } from "@/types/layout";

import type { Post as PostType } from ".contentlayer/generated";
import { allPosts } from ".contentlayer/generated";

type PostsPageProps = {
  posts: PostType[];
};

export default function PostsPage(props: PostsPageProps) {
  const posts = groupPostsByYear(props.posts);
  const customMeta: MetaProps = {
    title: `Kolade Afode - Writing`,
    description: "I write about things I learn and things I do.",
    thumbnail: ``,
  };

  return (
    <Layout customMeta={customMeta} small>
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

        <Section
          heading="WRITING"
          description="I write about things I learn and things I do."
        >
          <div className="flex flex-col w-full gap-6">
            {Object.entries(posts).map(([year, posts]) => (
              <PostByYear key={year} year={year} posts={posts} />
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

type PostProps = {
  year: string;
  posts: PostType[];
};

function PostByYear(props: PostProps) {
  const { year, posts } = props;

  return (
    <div className="flex flex-col w-full gap-2 p-4 transition-colors border gradient-bg-flip rounded-2xl border-shark-800">
      <div className="w-full text-3xl font-black">{year}</div>
      <div className="overflow-hidden border rounded-t-xl rounded-b-xl border-shark-700 bg-shark-900">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-4 transition-colors duration-200 ease-in-out border-b border-shark-700 bg-shark-800 last:border-0 hover:bg-shark-700"
          >
            <Link className="flex justify-between" href={`/posts/${post.slug}`}>
              <div className="flex flex-col gap-2">
                <div className="text-lg font-light text-silver">
                  {post.title}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-silver">
                <div className="text-sm font-extralight">
                  {formatDate(post.publishedAt, "MM/dd")}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
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
  const posts = allPosts;
  return {
    props: { posts },
  };
};
