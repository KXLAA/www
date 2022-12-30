import { components } from "components/mdx/components/MDXComponents";
import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Layout } from "@/components/common/Layout";
import { PostLayout } from "@/components/posts/PostLayout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { formatDate } from "@/lib/date";
import type { MetaProps } from "@/lib/seo";

const DraggableAndDroppable = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/DraggableAndDroppable"
    )
);

const DndContextEvents = dynamic(
  () =>
    import("../../components/mdx/widgets/drag-and-drop-post/DndContextEvents")
);

const MDXComponents = {
  DraggableAndDroppable,
  DndContextEvents,
  ...components,
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
  const ogImageUrl = `/api/og?title=${encodeURIComponent(
    post.title
  )}&date=${encodeURIComponent(formatDate(post.publishedAt, "MMMM dd yyyy"))}`;

  const meta: MetaProps = {
    title: `${title} | Kolade Afode`,
    description: post.description,
    canonical: url,
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      article: {
        publishedTime: post.publishedAt,
        authors: ["https://kxlaa.com"],
        tags: post?.tags?.map((c: string) => c),
      },
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
  };
  return (
    <>
      <Layout customMeta={meta} className="gap-0" light>
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
