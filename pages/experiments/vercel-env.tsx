import { Layout } from "@/components/common/Layout";
import { VercelEnvInputs } from "@/components/experiments/vercel-env-inputs";

export default function Experiments() {
  return (
    <Layout
      className="flex flex-col items-center justify-center gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      key="home-page"
    >
      <div className="w-full max-w-5xl p-8 border border-dashed rounded-lg border-shark-600 grid-bg">
        <VercelEnvInputs />
      </div>
    </Layout>
  );
}
