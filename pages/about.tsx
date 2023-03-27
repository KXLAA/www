import { Layout } from "@/components/common/Layout";

export default function AboutPage() {
  return (
    <Layout className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-8 md:py-8 md:gap-8 md:text-xl font-extralight">
      <h1 className="text-5xl font-medium">HI I'M, KOLA</h1>

      <div className="flex flex-col gap-2 p-4 rounded bg-cod-gray-600">
        <p className="text-base text-silver-800">At a glance</p>
      </div>
    </Layout>
  );
}
