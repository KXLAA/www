import type { GetStaticProps } from "next";
import Link from "next/link";

import { Footer } from "@/components/common/Footer";
import { Layout } from "@/components/common/Layout";
import { ExperimentCard } from "@/components/experiments/common/ExperimentCard";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { allExperiments } from "@/contentlayer/generated";

type ExperimentsProps = {
  experiments: ExperimentsType[];
};

export default function Experiments(props: ExperimentsProps) {
  const { experiments } = props;
  return (
    <Layout
      className="flex flex-col justify-center gap-4 p-2"
      key="home-page"
      customMeta={{
        title: `Kola | Experiments`,
        description: `Recreating some of my favorite ui interactions & building new
        prototypes.`,
      }}
    >
      <Link
        href="/"
        className="px-2 py-1 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        BACK
      </Link>
      <div className="grid gap-2 md:grid-cols-3">
        {experiments.map((experiment) => (
          <ExperimentCard {...experiment} key={experiment.slug} />
        ))}
      </div>
      <Footer />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      experiments: allExperiments,
    },
  };
};
