import Link from "next/link";

import { Tag } from "@/components/common/Tag";
import type { Post as PostType } from "@/contentlayer/generated";

type PostsProps = {
  posts: PostType[];
};

export function Posts(props: PostsProps) {
  const { posts } = props;
  return (
    <section className="max-w-[540px] flex flex-col gap-4 w-full bg-shark-700 p-6 rounded-xl shadow-border-shiny">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-medium">Writing</h2>
          <p className="font-extralight">
            I write about things I learn and things I do.
          </p>
        </div>

        <Link
          className="self-start px-2 py-0.5 text-xs transition-colors duration-200 rounded-full shadow-border-shiny  font-medium text-silver hover:bg-shark-500"
          href="posts"
        >
          view all
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link
            className="flex flex-col gap-4 p-4 transition-all rounded-xl bg-shark-600 hover:shadow-border-shiny"
            key={post.slug}
            href={`/posts/${post.slug}`}
          >
            <div>
              <h3 className="text-xl font-medium">{post.title}</h3>
              <p className="text-base font-extralight text-silver-600">
                {post.description}
              </p>
            </div>

            <div className="flex gap-2">
              {post.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
