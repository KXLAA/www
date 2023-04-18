import type { HomePageProps } from "@/components/home/Home";
import { Home } from "@/components/home/Home";
import { api } from "@/lib/api";
import { generateRSS } from "@/lib/rss";

export default function HomePage(props: HomePageProps) {
  return <Home {...props} />;
}

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
