import type { GetStaticProps } from "next";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { About } from "@/components/home/About";
import { Posts } from "@/components/home/Posts";
import { SidePanel } from "@/components/home/SidePanel";
import { Work } from "@/components/home/Work";

import type { Post as PostType } from ".contentlayer/generated";
import { allPosts } from ".contentlayer/generated";

type HomeProps = {
  posts: PostType[];
};

export default function Home(props: HomeProps) {
  const posts = props.posts.slice(0, 4);

  return (
    <Layout className="relative flex-row items-start gap-6 my-24">
      <SidePanel />

      <div className="flex flex-col gap-10">
        <About />
        <Posts posts={posts} />
        <Work />
        <Footer />
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
