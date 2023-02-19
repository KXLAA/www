import type { HomePageProps } from "@/components/home/HomePage";
import { HomePage } from "@/components/home/HomePage";
import { api } from "@/lib/api";

export default (props: HomePageProps) => <HomePage {...props} />;

export const getStaticProps = async () => {
  return {
    props: {
      posts: api.getMinimalPosts(),
      experiments: api.getMinimalExperiments(),
    },
  };
};
