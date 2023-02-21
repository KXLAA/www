import dynamic from "next/dynamic";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";

import { ExperimentLayout } from "@/components/experiments/ExperimentLayout";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import type { SeoProps } from "@/lib/seo";

const VercelEnvInputs = dynamic(
  () =>
    import(
      "@/components/experiments/widgets/vercel-env-inputs/VercelEnvInputs"
    ),
  {
    loading: () => (
      <div className="h-[201px] bg-cod-gray-600 border border-cod-gray-900 animate-pulse rounded-lg shadow-lg" />
    ),
  }
);

const MixCloudTrackList = dynamic(
  () =>
    import(
      "@/components/experiments/widgets/mixcloud-tracklist/MixCloudTracklist"
    )
);

const MDXComponents = {
  VercelEnvInputs,
  MixCloudTrackList,
};

export type ExperimentPageProps = {
  experiment: ExperimentsType;
};

export function ExperimentPage(props: ExperimentPageProps) {
  const { Component, meta } = useExperimentPage(props);

  return (
    <ExperimentLayout {...props.experiment} customMeta={meta}>
      <Component components={MDXComponents} />
    </ExperimentLayout>
  );
}

function useExperimentPage(args: ExperimentPageProps) {
  const { experiment } = args;
  const Component = useMDXComponent(experiment.body?.code);
  useLiveReload();

  const path = `/experiments/${experiment.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `Experiment ${experiment.number} - ${experiment.title}`;
  const description = `Kola's UI Experiments`;

  const meta: SeoProps = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      title,
      description: description,
      url,
      images: [
        {
          url: experiment?.ogImage || "/images/main-og-image.jpg",
          width: 1200,
          height: 600,
          alt: `Kola's UI Experiments`,
        },
      ],
    },
    twitter: {
      handle: `@kxlaa_`,
      site: `@kxlaa_`,
      cardType: "summary_large_image",
    },
    ogImage: experiment?.ogImage || "/images/main-og-image.jpg",
  };

  return {
    Component,
    meta,
  };
}
