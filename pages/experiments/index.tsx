import type { ExperimentsPageProps } from "@/components/experiments/ExperimentsPage";
import { ExperimentsPage } from "@/components/experiments/ExperimentsPage";
import { api } from "@/lib/api";

export default (props: ExperimentsPageProps) => <ExperimentsPage {...props} />;

export const getStaticProps = async () => {
  return {
    props: {
      experiments: api.getMinimalExperiments(),
    },
  };
};
