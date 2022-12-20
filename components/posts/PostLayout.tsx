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

      <div className="flex flex-col-reverse px-0 pb-24 md:flex-row">
        <div className="relative flex-1 max-w-[65ch] min-w-0 px-6 text-xl prose md:px-0 font-light">
          {props.children}
        </div>
        <PostSideBar tableOfContent={props?.headings || []} />
      </div>
    </>
  );
}