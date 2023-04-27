import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import type { Experiment as ExperimentsType } from "@/contentlayer/generated";
import { api } from "@/lib/api";
import { cx } from "@/lib/cx";
import type { SeoProps } from "@/lib/seo";

type ExperimentLayoutProps = ExperimentsType & {
  children: React.ReactNode;
  customMeta?: SeoProps;
};

export function ExperimentLayout(props: ExperimentLayoutProps) {
  const { next, prev } = useExperimentLayout(props);

  return (
    <Layout
      className="flex flex-col items-center justify-center max-w-5xl gap-4 px-4 py-4 mx-auto text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      customMeta={props.customMeta}
    >
      <Link
        href="/experiments"
        className="flex items-center self-start gap-1 text-lg font-normal transition-all w-fit text-silver-700 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy"
      >
        Back
      </Link>

      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-3xl font-semibold transition-colors text-silver-600">
            {props.title}
          </h1>
          <p className="text-base font-light text-silver-800">
            {props.publishedAt}
          </p>
        </div>

        <a
          href={props.github}
          className="flex items-center self-end gap-1 text-sm font-light transition-all w-fit text-silver-700 hover:text-silver-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </div>

      <div className="w-full p-4 border border-dashed rounded-lg md:p-8 border-shark-600 grid-bg bg-cod-gray-800">
        {props.children}
      </div>

      <Show when={!!prev && !!next}>
        <div
          className={cx(
            "flex w-full gap-4 text-sm font-medium border-t border-dashed text-silver-900 border-shark-600 py-10 ",
            prev ? "justify-between " : "justify-end"
          )}
        >
          <Show when={!!prev}>
            <Navigation experiment={prev} label="Previous" />
          </Show>

          <Show when={!!next}>
            <Navigation experiment={next} label="Next" className="text-right" />
          </Show>
        </div>
      </Show>
    </Layout>
  );
}

function Navigation(props: {
  experiment: ExperimentsType;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href={props.experiment!.slug}
      className={cx("flex flex-col gap-1 text-sm", props.className)}
    >
      <span className="font-normal">{props.label}</span>
      <span className="font-extralight text-silver-700">
        {props.experiment?.title}
      </span>
    </Link>
  );
}

function useExperimentLayout(args: ExperimentLayoutProps) {
  const current = api.experiments.published.findIndex(
    (p) => p.slug === args.slug
  );
  const next = api.experiments.published[current + 1];
  const prev = api.experiments.published[current - 1];

  return {
    next,
    prev,
    publishedExperiments: api.experiments.published,
  };
}
