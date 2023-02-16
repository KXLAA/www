import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Layout } from "@/components/common/Layout";
import { components } from "@/components/mdx/MDXComponents";
import { PostLayout } from "@/components/posts/PostLayout";
import type { Post as PostType } from "@/contentlayer/generated";
import type { MetaProps } from "@/lib/seo";

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

export type PostPageProps = {
  post: PostType;
};

export function PostPage(props: PostPageProps) {
  const { post } = props;
  const { Component, meta } = usePostPage(props);

  return (
    <Layout customMeta={meta} key="post">
      <PostLayout {...post}>
        <Component components={MDXComponents} />
      </PostLayout>
    </Layout>
  );
}

function usePostPage(args: PostPageProps) {
  const { post } = args;
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `Writing | ${post.title}`;

  const meta: MetaProps = {
    title: title,
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
          url: post.ogImage || "/images/main-og-image.jpg",
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      handle: `@kxlaa_`,
      site: `@kxlaa_`,
      cardType: "summary_large_image",
    },
  };

  return {
    Component,
    meta,
  };
}
