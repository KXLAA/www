import Head from "next/head";
import { NextSeo } from "next-seo";

import { AnimateLayout } from "@/components/animation/AnimateLayout";
import { cx } from "@/lib/cx";
import type { MetaProps } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  light?: boolean;
  customMeta?: MetaProps;
  className?: string;
  hideHeader?: boolean;
};

export function Layout(props: LayoutProps) {
  const { children, customMeta, className } = props;
  return (
    <>
      {customMeta && (
        <>
          <NextSeo {...customMeta} />
          <Head>
            <meta
              name="twitter:image"
              content={customMeta.openGraph?.images?.[0].url}
            />
          </Head>
        </>
      )}
      <div
        className={cx(
          "flex min-h-screen w-full flex-col bg-cod-gray-700 text-silver"
        )}
      >
        <main>
          <AnimateLayout className={className}>{children}</AnimateLayout>
        </main>
      </div>
    </>
  );
}
