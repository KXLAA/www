import Link from "next/link";

import { Show } from "@/components/common/Show";
import { Section } from "@/components/home/Section";
import type { Post as PostType } from "@/contentlayer/generated";
import { formatDate } from "@/lib/date";

type WritingProps = {
  posts: PostType[];
};

export function Writing(props: WritingProps) {
  const { posts } = props;
  return (
    <Section
      heading="Writing"
      description="Sharing experiences, knowledge and videos on design & tech."
    >
      <div className="flex flex-col gap-2">
        {posts.slice(0, 3).map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            key={post.slug}
            className="flex gap-3 p-2 transition-colors rounded-md md:p-3 hover:bg-cod-gray-500"
            data-splitbee-event={`Click on ${post.title}`}
            data-splitbee-event-contentType="Article"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold">{post.title}</p>
              <p className="mt-0.5 text-xs text-[10px] font-normal text-silver-900">
                {formatDate(post.publishedAt, "MM/dd/yyyy")}
              </p>
            </div>
          </Link>
        ))}

        <Show when={props.posts.length > 3}>
          <Link
            href="/posts"
            className="py-2 text-xs font-semibold text-center transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:border-cod-gray-400"
            data-splitbee-event="Click on All Articles"
          >
            All Articles
          </Link>
        </Show>
      </div>
    </Section>
  );
}
