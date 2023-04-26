import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import type { Experiment as ExperimentsType } from "@/contentlayer/generated";
import { useFeature } from "@/lib/flags";

type ExperienceProps = {
  experiments: Array<ExperimentsType>;
};

export function Experiments(props: ExperienceProps) {
  const isFeatureEnabled = useFeature("experiments");

  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Experiments">
        {props.experiments.map((e) => (
          <div className="flex flex-col gap-1" key={e.title}>
            <p className="text-base font-normal underline text-silver-600">
              {e.title}
            </p>
          </div>
        ))}
      </Section>
    </Show>
  );
}
