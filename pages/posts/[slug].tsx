import type { GetStaticProps } from "next";

import type { PostPageProps } from "@/components/posts/PostPage";
import { PostPage } from "@/components/posts/PostPage";
import { api } from "@/lib/api";

export default function Post(props: PostPageProps) {
  return <PostPage {...props} />;
}

export async function getStaticPaths() {
  return {
    paths: api.posts.published.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = api.posts.published.find((p) => p.slug === params?.slug);
  return { props: { post } };
};
