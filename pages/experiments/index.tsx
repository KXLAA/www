import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { Header } from "@/components/home/Header";
import type { Experiment as ExperimentsType } from "@/contentlayer/generated";
import { api } from "@/lib/api";

type ExperimentsPageProps = {
  experiments: ExperimentsType[];
};

export default function Experiments(props: ExperimentsPageProps) {
  return (
    <Layout
      className="flex flex-col justify-center max-w-lg gap-6 px-4 py-4 text-base md:px-8 md:py-8 md:text-xl font-extralight"
      customMeta={{
        title: `Kola | Experiments`,
        description: `Recreating some of my favorite ui interactions & building new
            prototypes.`,
      }}
    >
      <Header
        heading="Experiments."
        subheading="Recreating some of my favorite ui interactions"
      />

      <div className="flex flex-col gap-1">
        {props.experiments.map((experiment) => (
          <article key={experiment.slug}>
            <Link
              href={`/experiments/${experiment.slug}`}
              className="flex gap-3 px-0 py-2"
              data-splitbee-event={`Click on ${experiment.title}`}
              data-splitbee-event-contentType="Article"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-lg font-medium transition-colors text-silver-600 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy">
                  {experiment.title}
                </p>
                {/* <p className="text-base font-extralight text-silver-700">
                  {experiment.description}
                </p> */}
                <p className="mt-2 text-xs font-normal text-silver-900">
                  {experiment.publishedAt}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      experiments: api.experiments.minimal,
    },
  };
};
