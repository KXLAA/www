import { components } from "components/mdx/components/MDXComponents";
import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";

import { AnimateLayout } from "@/components/animation/AnimateLayout";
import { Layout } from "@/components/common/Layout";
import { PostLayout } from "@/components/posts/PostLayout";
import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";
import { formatDate } from "@/lib/date";
import type { MetaProps } from "@/lib/seo";

const FreeDnd = dynamic(
  () =>
    import("../../components/mdx/widgets/drag-and-drop-post/free-dnd/FreeDnd")
);
const DroppableDnd = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/droppable-dnd/DroppableDnd"
    )
);
const FreeDnDSandPack = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/free-dnd/FreeDnDSandPack"
    )
);

const DroppableDndSandPack = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/droppable-dnd/DroppableDndSandPack"
    )
);

const SortableDnd = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/sortable-dnd/SortableDnd"
    )
);

const SortableDndSandPack = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/sortable-dnd/SortableDndSandPack"
    )
);

const SortableMultiDnd = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/sortable-multi-dnd/SortableMultiDnd"
    )
);

const SortableMultiDndSandPack = dynamic(
  () =>
    import(
      "../../components/mdx/widgets/drag-and-drop-post/sortable-multi-dnd/SortableMultiDndSandPack"
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
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `${post.title} | Kolade Afode`;
  const date = post?.publishedAt || new Date().toDateString();
  const ogImageUrl = `/api/og?title=${encodeURIComponent(
    post.title
  )}&date=${encodeURIComponent(formatDate(date, "MMMM dd yyyy"))}`;

  const meta: MetaProps = {
    title: `${title} | Kola`,
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
      <Layout customMeta={meta} hideHeader>
        <AnimateLayout key="post">
          <PostLayout {...post}>
            <Component components={MDXComponents} />
          </PostLayout>
        </AnimateLayout>
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
