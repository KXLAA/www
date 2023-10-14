import { motion } from "framer-motion";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";

import { Layout } from "@/components/common/Layout";
import { cx } from "@/lib/cx";

function ErrorPage() {
  return (
    <Layout
      className="flex flex-col justify-center max-w-xl gap-4 px-4 py-4 text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      customMeta={{
        title: "Oops! Something went wrong.",
        description: "Oops! Something went wrong.",
      }}
    >
      <div className="flex flex-col">
        <Link
          href="/"
          className="px-2 py-1 mb-6 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
        >
          BACK HOME
        </Link>
        <p className="text-2xl font-semibold underline">Something went wrong</p>

        {Array.from({ length: 4 }).map((_, i) => (
          <motion.p
            key={i}
            className={cx("mt-1 text-sm", `text-silver-${600 + i * 100}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            Oops! Something went wrong.
          </motion.p>
        ))}
      </div>
    </Layout>
  );
}

type ReactErrorBoundaryProps = {
  children: React.ReactNode;
};

export default function ReactErrorBoundary(props: ReactErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        console.log("Error caught!");
        console.error(error);
        console.error(errorInfo);
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}
