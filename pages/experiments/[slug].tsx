import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";

import { ExperimentLayout } from "@/components/experiments/common/ExperimentLayout";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { allExperiments } from "@/contentlayer/generated";

const VercelEnvInputs = dynamic(
  () => import("@/components/experiments/vercel-env-inputs/VercelEnvInputs")
);

const MixCloudTrackList = dynamic(
  () => import("@/components/experiments/mixcloud-tracklist/MixCloudTracklist")
);

const MDXComponents = {
  VercelEnvInputs,
  MixCloudTrackList,
};

type ExperimentProps = {
  experiment: ExperimentsType;
};

export default function Experiment(props: ExperimentProps) {
  const { experiment } = props;
  const Component = useMDXComponent(experiment.body?.code);
  useLiveReload();

  return (
    <ExperimentLayout {...experiment}>
      <Component components={MDXComponents} />
    </ExperimentLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allExperiments.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const experiment = allExperiments.find((p) => p.slug === params?.slug);
  return { props: { experiment } };
};
