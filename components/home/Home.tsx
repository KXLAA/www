import { Activity } from "lucide-react";

import { Avatar } from "@/components/common/Avatar";
import { Layout } from "@/components/common/Layout";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
import { Experiments } from "@/components/home/Experiments";
import { Posts } from "@/components/home/Posts";
import { Projects } from "@/components/home/Projects";
import type {
  Experiment as ExperimentsType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import type { Experience as ExperienceType } from "@/lib/api";
import { useDate } from "@/lib/hooks/use-date";

export type HomePageProps = {
  posts: Array<PostType>;
  experiments: Array<ExperimentsType>;
  projects: Array<ProjectType>;
  contacts: Array<{ name: string; href: string }>;
  experience: Array<ExperienceType>;
};

export function Home(props: HomePageProps) {
  const { date } = useDate();

  return (
    <Layout className="flex flex-col justify-center max-w-lg gap-4 px-4 py-4 text-base md:px-8 md:py-8 md:gap-8 md:text-xl font-extralight">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center text-xs text-[10px] font-medium text-silver-900">
          <p>{date}</p>
          <Activity strokeWidth={1.22} className="w-4 h-4" />
          <p>London, UK 🇬🇧</p>
        </div>

        <div className="flex items-center gap-3">
          <Avatar />

          <div className="text-base font-normal">
            <p className="text-silver-600">Kolade Afode</p>
            <p className="text-sm font-light text-silver-800">
              Frontend Engineer, London UK.
            </p>
          </div>
        </div>
      </div>

      <Experience {...props} />
      <Posts {...props} />
      <Projects {...props} />
      <Contact {...props} />
      <Experiments {...props} />
    </Layout>
  );
}
