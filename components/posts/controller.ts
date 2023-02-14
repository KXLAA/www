import { useMDXComponent } from "next-contentlayer/hooks";

import type { Post as PostType } from "@/contentlayer/generated";
import type { MetaProps } from "@/lib/seo";

export function useController(post: PostType) {
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `Writing | ${post.title}`;
  const ogImage = `${getBaseUrl()}${post.ogImage}`;
  console.log(ogImage);

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
          url: ogImage || "/images/main-og-image.jpg",
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

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000"
  );
}
