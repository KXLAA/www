import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Layout } from "@/components/common/Layout";
import { PostLayout } from "@/components/posts/PostLayout";
import type { MetaProps } from "@/lib/seo";

import type { Post as PostType } from ".contentlayer/generated";
import { allPosts } from ".contentlayer/generated";

const DraggableAndDroppable = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/DraggableAndDroppable"
    )
);

const MDXComponents = {
  Head,
  Image,
  Link,
  DraggableAndDroppable,
};

type PostProps = {
  post: PostType;
};

export default function Post(props: PostProps) {
  const { post } = props;
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `${post.title} | Kolade Afode`;
  const meta: MetaProps = {
    title: `${title} | Kolade Afode`,
    description: post.description,
    canonical: url,
    openGraph: {
      url,
      title,
      description: post.description,
      images: [],
    },
  };
  return (
    <>
      <Layout customMeta={meta} className="gap-0" light small>
        <PostLayout {...post}>
          <Component components={MDXComponents} />
        </PostLayout>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p.slug === params?.slug);
  return { props: { post } };
};
