import dynamic from "next/dynamic";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";

import { ExperimentLayout } from "@/components/experiments/ExperimentLayout";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";

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
  const { experiment } = props;
  const Component = useMDXComponent(experiment.body?.code);
  useLiveReload();

  return (
    <ExperimentLayout
      {...experiment}
      customMeta={{
        title: `Experiments | ${experiment.title}`,
      }}
    >
      <Component components={MDXComponents} />
    </ExperimentLayout>
  );
}
