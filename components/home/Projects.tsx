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
            className="flex gap-3 px-0 pb-2"
            target="_blank"
            rel="noreferrer"
            data-splitbee-event={`Click on ${project.title}`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <p className="text-lg font-medium transition-colors text-silver-600 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy ">
                  {project.title}
                </p>
              </div>

              <p className="text-base font-extralight text-silver-700">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </Section>
    </Show>
  );
}
