import { Clock } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import type { Post as PostType } from "@/contentlayer/generated";
import { useFeature } from "@/lib/flags";

type PostsProps = {
  posts: Array<PostType>;
};

export function Posts(props: PostsProps) {
  const isFeatureEnabled = useFeature("posts");
  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Selected Posts">
        {props.posts.slice(0, 2).map((post) => (
          <article key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="flex gap-3 px-0"
              data-splitbee-event={`Click on ${post.title}`}
              data-splitbee-event-contentType="Article"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-normal underline text-silver-600 hover:decoration-dotted">
                  {post.title}
                </p>
                <p className="text-sm font-extralight text-silver-700">
                  {post.description}
                </p>

                <div className="flex items-center gap-1 font-extralight mt-0.5">
                  <Clock className="inline-block w-3 h-3 text-silver-900" />
                  <p className="text-xs font-normal text-silver-900">
                    {post.publishedAt}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}

        <Link
          href="/posts"
          className="text-xs font-bold underline text-silver-900 hover:decoration-dotted"
        >
          View all posts
        </Link>
      </Section>
    </Show>
  );
}
