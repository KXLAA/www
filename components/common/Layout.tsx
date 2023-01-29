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
  key?: string;
};

export function Layout(props: LayoutProps) {
  const { children, customMeta, key, className } = props;
  return (
    <>
      {customMeta && <NextSeo {...customMeta} />}
      <div
        className={cx(
          "flex min-h-screen w-full flex-col bg-shark-900 text-silver"
        )}
      >
        <main>
          <AnimateLayout key={key} className={className}>
            {children}
          </AnimateLayout>
        </main>
      </div>
    </>
  );
}
