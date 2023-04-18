import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import type { Project as ProjectType } from "@/contentlayer/generated";
import { useFeature } from "@/lib/flags";

type PostsProps = {
  projects: Array<ProjectType>;
};

export function Projects(props: PostsProps) {
  const isFeatureEnabled = useFeature("projects");

  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Selected Projects">
        {props.projects.map((project) => (
          <a
            key={project.url}
            href={project.url}
            className="flex gap-3 px-0"
            target="_blank"
            rel="noreferrer"
            data-splitbee-event={`Click on ${project.title}`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <p className="text-base font-normal underline text-silver-600 hover:decoration-dotted">
                  {project.title}
                </p>
                <ArrowUpRight
                  className="w-5 h-5 text-silver-600"
                  strokeWidth={1.22}
                />
              </div>

              <p className="text-sm font-extralight text-silver-700">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </Section>
    </Show>
  );
}
