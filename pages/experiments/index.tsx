import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import type { Experiment as ExperimentsType } from "@/contentlayer/generated";
import { api } from "@/lib/api";

type ExperimentsPageProps = {
  experiments: ExperimentsType[];
};

export default function Experiments(props: ExperimentsPageProps) {
  return (
    <Layout
      className="flex flex-col items-center w-full min-h-screen gap-8 p-4 py-8 sm:p-10 text-gray-dark-12"
      customMeta={{
        title: `Kola | Experiments`,
        description: `Recreating some of my favorite ui interactions & building new
            prototypes.`,
      }}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Experiments</h2>
        <div className="flex flex-col gap-1">
          {props.experiments.map((experiment) => (
            <article key={experiment.slug}>
              <Link
                href={`/experiments/${experiment.slug}`}
                className="flex gap-3 px-0 py-2 text-2xl"
                data-splitbee-event={`Click on ${experiment.title}`}
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-2xl font-medium transition-colors text-gray-dark-11 hover:text-gray-dark-10">
                    {experiment.title}
                  </p>
                  <p className="text-base font-light text-gray-dark-10">
                    {experiment.description}
                  </p>
                  <div className="flex gap-1 text-sm font-medium text-gray-dark-10">
                    {experiment.publishedAt}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="self-start text-lg font-semibold transition-all text-orange-dark-10 hover:text-orange-dark-9"
        >
          Back Home
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { experiments: api.experiments.minimal },
  };
}
