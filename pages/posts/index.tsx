import type { PostsPageProps } from "@/components/posts/PostsPage";
import { PostsPage } from "@/components/posts/PostsPage";
import { allPosts } from "@/contentlayer/generated";
import { prepare } from "@/lib/api";

export default (props: PostsPageProps) => <PostsPage {...props} />;

export const getStaticProps = async () => {
  return {
    props: {
      posts: prepare.posts(allPosts),
    },
  };
};
