import { Layout } from "@/components/common/Layout";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
import { Experiments } from "@/components/home/Experiments";
import { Header } from "@/components/home/Header";
import { Posts } from "@/components/home/Posts";
import { Projects } from "@/components/home/Projects";
import type {
  Experiment as ExperimentsType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import type { Experience as ExperienceType } from "@/lib/api";
import { api } from "@/lib/api";
import { generateRSS } from "@/lib/rss";

type HomePageProps = {
  posts: Array<PostType>;
  experiments: Array<ExperimentsType>;
  projects: Array<ProjectType>;
  contacts: Array<{ name: string; href: string }>;
  experience: Array<ExperienceType>;
};

export default (props: HomePageProps) => (
  <Layout className="flex flex-col justify-center max-w-lg gap-4 px-4 py-4 text-base md:px-8 md:py-8 md:gap-8 md:text-xl font-extralight">
    <Header />
    <Experience {...props} />
    <Posts {...props} />
    <Projects {...props} />
    <Experiments {...props} />
    <Contact {...props} />
  </Layout>
);

export const getStaticProps = async () => {
  generateRSS();

  return {
    props: {
      posts: api.posts.minimal,
      experiments: api.experiments.minimal,
      projects: api.projects,
      contacts: api.contacts,
      experience: api.experience,
    },
  };
};
