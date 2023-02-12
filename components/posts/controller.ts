import { useMDXComponent } from "next-contentlayer/hooks";

import type { Post as PostType } from "@/contentlayer/generated";
import { formatDate } from "@/lib/date";
import type { MetaProps } from "@/lib/seo";

export function useController(post: PostType) {
  const Component = useMDXComponent(post.body.code);
  const path = `/posts/${post.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `Writing | ${post.title}`;
  const date = post?.publishedAt || new Date().toDateString();
  const ogImageUrl = `/api/og?title=${encodeURIComponent(
    post.title
  )}&date=${encodeURIComponent(formatDate(date, "MMMM dd yyyy"))}`;

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
          url: "/images/og-image.png",
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
  };

  return {
    Component,
    meta,
  };
}
