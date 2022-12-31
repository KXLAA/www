import type { PostHeaderProps } from "@/components/posts/PostHeader";
import { PostHeader } from "@/components/posts/PostHeader";
import { PostSideBar } from "@/components/posts/PostSideBar";

type PostLayoutProps = PostHeaderProps & {
  children: React.ReactNode;
};

export function PostLayout(props: PostLayoutProps) {
  return (
    <>
      <PostHeader {...props} />
      <div className="flex flex-col-reverse gap-8 px-0 pb-24 md:flex-row">
        <div className="relative flex-1 max-w-[65ch] min-w-0 px-0 text-xl prose md:pr-6 scroll-smooth">
          {props.children}
        </div>
        <PostSideBar tableOfContent={props?.headings || []} />
      </div>
    </>
  );
}
