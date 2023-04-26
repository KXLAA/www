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
          <article key={post.slug} className="pb-2">
            <Link
              href={`/posts/${post.slug}`}
              className="flex gap-3 px-0"
              data-splitbee-event={`Click on ${post.title}`}
              data-splitbee-event-contentType="Article"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-lg font-medium transition-colors text-silver-600 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy">
                  {post.title}
                </p>
                <p className="text-base font-extralight text-silver-700">
                  {post.description}
                </p>

                <p className="mt-1 text-xs font-normal text-silver-900">
                  {post.publishedAt}
                </p>
              </div>
            </Link>
          </article>
        ))}

        <Link
          href="/posts"
          className="self-start text-xs font-semibold transition-all text-silver-700 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy"
        >
          View all posts
        </Link>
      </Section>
    </Show>
  );
}
