import type { ExperimentsPageProps } from "@/components/experiments/ExperimentsPage";
import { ExperimentsPage } from "@/components/experiments/ExperimentsPage";
import { allExperiments } from "@/contentlayer/generated";
import { prepare } from "@/lib/api";

export default (props: ExperimentsPageProps) => <ExperimentsPage {...props} />;

export const getStaticProps = async () => {
  return {
    props: {
      experiments: prepare.experiments(allExperiments),
    },
  };
};
