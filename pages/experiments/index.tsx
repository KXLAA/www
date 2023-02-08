import { Layout } from "@/components/common/Layout";
import { VercelEnvInputs } from "@/components/experiments/vercel-env-inputs";

export default function Experiments() {
  return (
    <Layout
      className="flex flex-col items-center justify-center max-w-4xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      key="home-page"
    >
      <VercelEnvInputs />
    </Layout>
  );
}
