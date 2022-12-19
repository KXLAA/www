import type { GetStaticProps } from "next";

import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Layout } from "@/components/common/Layout";
import { Now } from "@/components/home/Now";
import { Posts } from "@/components/home/Posts";
import { Work } from "@/components/home/Work";
import { getAllPosts } from "@/lib/api";
import type { PostType } from "@/types/post";

type HomeProps = {
  posts: PostType[];
};

export default function Home(props: HomeProps) {
  const posts = props.posts.slice(0, 4);

  return (
    <Layout>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col w-full gap-4">
          <Header />
          <Work />
        </div>
        <div className="flex flex-col w-full gap-4">
          <Posts posts={posts} />
          <Now />
          <Footer />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    "date",
    "description",
    "slug",
    "title",
    "tags",
    "duration",
    "headings",
  ]);

  return {
    props: { posts },
  };
};
