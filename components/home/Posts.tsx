import Link from "next/link";

import { Section } from "@/components/common/Section";
import { Tag } from "@/components/common/Tag";
import { formatDate } from "@/lib/date";
import type { PostType } from "@/types/post";

type PostsProps = {
  posts?: PostType[];
};

export function Posts(props: PostsProps) {
  const { posts } = props;
  const articleCount = posts?.length;
  return (
    <Section
      heading="WRITING"
      description="I write about things I learn and things I do."
      addon={
        <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full aspect-square bg-shark-700">
          {articleCount}
        </div>
      }
    >
      <div className="relative flex flex-col w-full gap-6 fade-out">
        {posts?.map((post) => (
          <Post key={post.slug} {...post} />
        ))}
      </div>
      <Link
        className="flex items-center self-center text-sm font-light text-center transition-all duration-200 ease-in-out border-b border-shark-50 text-silver-800 hover:border-silver-400 hover:text-silver-400"
        href="/posts"
      >
        See all
      </Link>
    </Section>
  );
}

function Post(props: PostType) {
  const { title, description, slug, tags } = props;
  const date = formatDate(props.date, "MMMM dd, yyyy");

  return (
    <Link
      className="flex  w-full flex-col justify-between gap-3 rounded-2xl shadow-border-shiny-2 bg-shark-800 p-5 transition-colors duration-200 ease-in-out hover:bg-[#141414]  grid-bg-faded"
      href={`/posts/${slug}`}
    >
      <div className="">
        <h3 className="mb-1 text-xl font-light">{title}</h3>
        <p className="m-0 text-sm font-extralight text-silver">{description}</p>
      </div>
      <div className="flex justify-between">
        <span className="m-0 text-[10px] font-light rounded-md text-silver-700 underline-offset-1 w-fit">
          {date}
        </span>
        <div className="flex gap-1">
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
