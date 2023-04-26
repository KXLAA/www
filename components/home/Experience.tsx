import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import type { Experience } from "@/lib/api";
import { useFeature } from "@/lib/flags";

type ExperienceProps = {
  experience: Array<Experience>;
};

export function Experience(props: ExperienceProps) {
  const isFeatureEnabled = useFeature("experience");

  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Experience">
        {props.experience.map((e) => (
          <div className="flex flex-col gap-1" key={e.href}>
            <p className="text-base font-normal underline text-silver-600">
              {e.role}
            </p>
            <p className="text-sm font-light text-silver-700">
              <a
                href={e.href}
                target="_blank"
                rel="noreferrer"
                data-splitbee-event={`Click on ${e.company}`}
                className=" text-silver-600 hover:underline hover:decoration-dotted"
              >
                {e.company}
              </a>
              · {e.location}
            </p>
            <p className="text-xs font-medium text-silver-900">{e.date}</p>
          </div>
        ))}
      </Section>
    </Show>
  );
}
