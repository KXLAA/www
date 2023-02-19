import type { GetStaticProps } from "next";

import type { PostPageProps } from "@/components/posts/PostPage";
import { PostPage } from "@/components/posts/PostPage";
import { api } from "@/lib/api";

export default (props: PostPageProps) => <PostPage {...props} />;

export const getStaticPaths = async () => {
  return {
    paths: api.getPublishedPosts().map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = api.getPublishedPosts().find((p) => p.slug === params?.slug);
  return { props: { post } };
};
