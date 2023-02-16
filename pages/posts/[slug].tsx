import type { GetStaticProps } from "next";

import type { PostPageProps } from "@/components/posts/PostPage";
import { PostPage } from "@/components/posts/PostPage";
import { allPosts } from "@/contentlayer/generated";

export default (props: PostPageProps) => <PostPage {...props} />;

export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p.slug === params?.slug);
  return { props: { post } };
};
