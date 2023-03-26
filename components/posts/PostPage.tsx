import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Layout } from "@/components/common/Layout";
import { components } from "@/components/mdx/MDXComponents";
import { PostHeader } from "@/components/posts/PostHeader";
import { PostSideBar } from "@/components/posts/PostSideBar";
import type { Post as PostType } from "@/contentlayer/generated";
import type { SeoProps } from "@/lib/seo";

const FreeDnd = dynamic(
  () => import("@/components/posts/widgets/drag-and-drop-post/free-dnd/FreeDnd")
);
const DroppableDnd = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/droppable-dnd/DroppableDnd"
    )
);
const FreeDnDSandPack = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/free-dnd/FreeDnDSandPack"
    )
);
const DroppableDndSandPack = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/droppable-dnd/DroppableDndSandPack"
    )
);
const SortableDnd = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/sortable-dnd/SortableDnd"
    )
);
const SortableDndSandPack = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/sortable-dnd/SortableDndSandPack"
    )
);
const SortableMultiDnd = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/sortable-multi-dnd/SortableMultiDnd"
    )
);
const SortableMultiDndSandPack = dynamic(
  () =>
    import(
      "@/components/posts/widgets/drag-and-drop-post/sortable-multi-dnd/SortableMultiDndSandPack"
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
  const { Component, meta } = usePostPage(props);

  return (
    <Layout customMeta={meta}>
      <div className="flex flex-col items-center justify-center max-w-5xl px-4 m-auto">
        <PostHeader {...props.post} />
        <div className="flex w-full px-0 pb-24 gap-14 md:flex-row">
          <div className="relative flex-1 max-w-[65ch] min-w-0 px-0 text-lg md:text-xl prose scroll-smooth">
            <Component components={MDXComponents} />
          </div>
          <PostSideBar tableOfContent={props.post?.headings || []} />
        </div>
      </div>
    </Layout>
  );
}

function usePostPage(args: PostPageProps) {
  const { post } = args;
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `${post.title}`;

  const meta: SeoProps = {
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
          url: post.og,
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
    ogImage: post.og,
  };

  return {
    Component,
    meta,
  };
}
