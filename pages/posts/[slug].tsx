import { components } from "components/mdx/components/MDXComponents";
import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Layout } from "@/components/common/Layout";
import { PostLayout } from "@/components/posts/PostLayout";
import { formatDate } from "@/lib/date";
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
  DraggableAndDroppable,
  ...components,
};

type PostProps = {
  post: PostType;
};

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
}

//https://kxlaa-m87l9gc6a-kxlaa.vercel.appkxlaa-m87l9gc6a-kxlaa.vercel.app/api/og?title=Drag%20%26%20drop%20in%20React%20with%20Dnd%20Kit%20%7C%20Kolade%20Afode&date=December%2027%202022

export default function Post(props: PostProps) {
  const { post } = props;
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `${post.title} | Kolade Afode`;
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/api/og?title=${encodeURIComponent(title)}&date=${encodeURIComponent(
    formatDate(post.publishedAt, "MMMM dd yyyy")
  )}`;

  console.log(ogImageUrl);

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
