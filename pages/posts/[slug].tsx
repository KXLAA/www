import { components } from "components/mdx/components/MDXComponents";
import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";

import { Layout } from "@/components/common/Layout";
import { useController } from "@/components/posts/controller";
import { PostLayout } from "@/components/posts/PostLayout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";

const FreeDnd = dynamic(
  () => import("@/widgets/drag-and-drop-post/free-dnd/FreeDnd")
);
const DroppableDnd = dynamic(
  () => import("@/widgets/drag-and-drop-post/droppable-dnd/DroppableDnd")
);
const FreeDnDSandPack = dynamic(
  () => import("@/widgets/drag-and-drop-post/free-dnd/FreeDnDSandPack")
);
const DroppableDndSandPack = dynamic(
  () =>
    import("@/widgets/drag-and-drop-post/droppable-dnd/DroppableDndSandPack")
);
const SortableDnd = dynamic(
  () => import("@/widgets/drag-and-drop-post/sortable-dnd/SortableDnd")
);
const SortableDndSandPack = dynamic(
  () => import("@/widgets/drag-and-drop-post/sortable-dnd/SortableDndSandPack")
);
const SortableMultiDnd = dynamic(
  () =>
    import("@/widgets/drag-and-drop-post/sortable-multi-dnd/SortableMultiDnd")
);
const SortableMultiDndSandPack = dynamic(
  () =>
    import(
      "@/widgets/drag-and-drop-post/sortable-multi-dnd/SortableMultiDndSandPack"
    )
);

const MDXComponents = {
  FreeDnDSandPack,
  FreeDnd,
  DroppableDnd,
  DroppableDndSandPack,
  SortableDnd,
  SortableDndSandPack,
  SortableMultiDnd,
  SortableMultiDndSandPack,
  ...components,
};

type PostProps = {
  post: PostType;
};

export default function Post(props: PostProps) {
  const { post } = props;
  const { Component, meta } = useController(post);

  return (
    <Layout customMeta={meta} key="post">
      <PostLayout {...post}>
        <Component components={MDXComponents} />
      </PostLayout>
    </Layout>
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
