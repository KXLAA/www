import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { Experiments } from "@/components/home/Experiments";
import { Header } from "@/components/home/Header";
import { Projects } from "@/components/home/Projects";
import { Writing } from "@/components/home/Writing";
import type {
  Experiments as ExperimentsType,
  Post as PostType,
} from "@/contentlayer/generated";

export type HomePageProps = {
  posts: PostType[];
  experiments: ExperimentsType[];
};

export function HomePage(props: HomePageProps) {
  const { posts, experiments } = props;
  return (
    <Layout className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight">
      <Header />
      <Projects />
      <Writing posts={posts} />
      <Experiments experiments={experiments} />
      <Footer />
    </Layout>
  );
}
