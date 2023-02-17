import type { PostsPageProps } from "@/components/posts/PostsPage";
import { PostsPage } from "@/components/posts/PostsPage";
import { api } from "@/lib/api";

export default (props: PostsPageProps) => <PostsPage {...props} />;

export const getStaticProps = async () => {
  return {
    props: {
      posts: api.getMinimalPosts(),
    },
  };
};
