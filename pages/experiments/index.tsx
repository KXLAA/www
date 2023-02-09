import { Layout } from "@/components/common/Layout";

export default function Experiments() {
  return (
    <Layout
      className="gap-3 p-3 columns-3"
      key="home-page"
      customMeta={{
        title: `Kola | Experiments`,
        description: `Recreating some of my favorite ui interactions & building new
        prototypes.`,
      }}
    >
      <div />
    </Layout>
  );
}
