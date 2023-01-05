import type { PostHeaderProps } from "@/components/posts/PostHeader";
import { PostHeader } from "@/components/posts/PostHeader";
import { PostSideBar } from "@/components/posts/PostSideBar";

type PostLayoutProps = PostHeaderProps & {
  children: React.ReactNode;
};

export function PostLayout(props: PostLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl px-4 m-auto">
      <PostHeader {...props} />
      <div className="flex w-full px-0 pb-24 gap-14 md:flex-row">
        <div className="relative flex-1 max-w-[65ch] min-w-0 px-0 text-xl prose scroll-smooth">
          {props.children}
        </div>
        <PostSideBar tableOfContent={props?.headings || []} />
      </div>
    </div>
  );
}
