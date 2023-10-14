import { motion } from "framer-motion";
import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { cx } from "@/lib/cx";

export default () => (
  <Layout
    className="flex flex-col items-center w-full min-h-screen gap-8 p-10 text-gray-dark-12"
    customMeta={{
      title: "404: The page you are looking for does not exist",
      description: "The page you are looking for does not exist.",
    }}
  >
    <div className="flex flex-col gap-4">
      <Link
        href="/"
        className="self-start text-xl font-bold transition-all text-orange-dark-10 hover:text-orange-dark-9"
      >
        BACK HOME
      </Link>
      <p className="text-6xl font-bold underline">404.</p>

      <div>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.p
            key={i}
            className={cx(
              "mt-1 text-lg sm:text-2xl",
              `text-gray-dark-10`,
              i % 2 === 0 ? `text-orange-dark-10` : `text-gray-dark-10`
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            The page you are looking for does not exist.
          </motion.p>
        ))}
      </div>
    </div>
  </Layout>
);
