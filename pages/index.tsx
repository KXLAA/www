import type { HomePageProps } from "@/components/home/HomePage";
import { HomePage } from "@/components/home/HomePage";
import { allExperiments, allPosts } from "@/contentlayer/generated";
import { prepare } from "@/lib/api";

export default (props: HomePageProps) => <HomePage {...props} />;

export const getStaticProps = async () => {
  return {
    props: {
      posts: prepare.posts(allPosts),
      experiments: prepare.experiments(allExperiments),
    },
  };
};
