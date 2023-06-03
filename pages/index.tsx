import { Layout } from "@/components/common/Layout";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
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
  experience: Array<ExperienceType>;
};

export default function Home(props: HomePageProps) {
  return (
    <Layout className="flex flex-col justify-center max-w-lg gap-4 px-4 py-4 text-base md:px-8 md:py-8 md:gap-8 md:text-xl font-extralight">
      <Header />
      <Experience {...props} />
      <Posts {...props} />
      <Projects {...props} />
      <Contact />
      <a
        href="https://github.com/KXLAA/www"
        target="_blank"
        className="text-xs text-silver-800 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy"
        rel="noreferrer"
        data-splitbee-event="Click on view source"
      >
        view source
      </a>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRSS();

  return {
    props: {
      posts: api.posts.minimal,
      experiments: api.experiments.minimal,
      projects: api.projects,
      experience: api.experience,
    },
  };
}
