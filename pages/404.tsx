import Link from "next/link";

import { Layout } from "@/components/common/Layout";

export default () => (
  <Layout className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight">
    <div className="flex flex-col ">
      <Link
        href="/"
        className="px-2 py-1 mb-6 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        BACK HOME
      </Link>
      <p className="text-2xl font-semibold underline">Page not found </p>

      <p className="mt-1 text-sm text-silver-600">
        The page you are looking for does not exist.
      </p>
      <p className="mt-1 text-sm text-silver-700">
        The page you are looking for does not exist.
      </p>
      <p className="mt-1 text-sm text-silver-800">
        The page you are looking for does not exist.
      </p>
      <p className="mt-1 text-sm text-silver-900">
        The page you are looking for does not exist.
      </p>
    </div>
  </Layout>
);
