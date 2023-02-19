import Link from "next/link";
import React from "react";

import { Show } from "@/components/common/Show";
import { ExperimentCard } from "@/components/experiments/ExperimentCard";
import { Section } from "@/components/home/Section";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { cx } from "@/lib/cx";

type ExperimentsProps = {
  experiments: ExperimentsType[];
};

export function Experiments(props: ExperimentsProps) {
  const { experiments } = props;

  return (
    <Section
      heading="Experiments"
      description="Recreating some of my favorite ui interactions & building new
        prototypes."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {experiments.slice(0, 2).map((experiment) => (
          <React.Fragment key={experiment.slug}>
            <ExperimentCard {...experiment} size="sm" />
            <Show when={experiments.length === 1}>
              <div
                className={cx(
                  "group relative flex  items-center justify-center gap-1.5 overflow-hidden transition-colors border rounded-md p-4 md:p-0 ",
                  "border-cod-gray-300 hover:border-cod-gray-400 bg-cod-gray-500 text-sm text-silver-600 hover:text-silver-800"
                )}
              >
                More Coming Soon
              </div>
            </Show>
          </React.Fragment>
        ))}
      </div>

      <Show when={experiments.length >= 2}>
        <Link
          href="/experiments"
          className="py-2 text-xs font-semibold text-center transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:border-cod-gray-400"
        >
          All Experiments
        </Link>
      </Show>
    </Section>
  );
}
