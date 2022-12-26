import type { GetStaticProps } from "next";

import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Layout } from "@/components/common/Layout";
import { Now } from "@/components/home/Now";
import { Posts } from "@/components/home/Posts";
import { Work } from "@/components/home/Work";

import type { Post as PostType } from ".contentlayer/generated";
import { allPosts } from ".contentlayer/generated";

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
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );

  return {
    props: { posts },
  };
};
