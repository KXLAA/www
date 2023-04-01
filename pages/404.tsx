import { motion } from "framer-motion";
import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { cx } from "@/lib/cx";

export default () => (
  <Layout
    className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
    customMeta={{
      title: "404: The page you are looking for does not exist",
      description: "The page you are looking for does not exist.",
    }}
  >
    <div className="flex flex-col">
      <Link
        href="/"
        className="px-2 py-1 mb-6 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        BACK HOME
      </Link>
      <p className="text-2xl font-semibold underline">Page not found </p>

      {Array.from({ length: 4 }).map((_, i) => (
        <motion.p
          key={i}
          className={cx("mt-1 text-sm", `text-silver-${600 + i * 100}`)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.1 }}
        >
          The page you are looking for does not exist.
        </motion.p>
      ))}
    </div>
  </Layout>
);
