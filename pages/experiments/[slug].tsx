import type { GetStaticProps } from "next";

import type { ExperimentPageProps } from "@/components/experiments/ExperimentPage";
import { ExperimentPage } from "@/components/experiments/ExperimentPage";
import { api } from "@/lib/api";

export default (props: ExperimentPageProps) => <ExperimentPage {...props} />;

export const getStaticPaths = async () => {
  return {
    paths: api.getPublishedExperiments().map((p) => ({
      params: { slug: p.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const experiment = api
    .getPublishedExperiments()
    .find((p) => p.slug === params?.slug);
  return { props: { experiment } };
};
