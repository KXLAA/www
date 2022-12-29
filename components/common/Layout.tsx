// import { Footer } from "@/components/common/Footer";
import { NextSeo } from "next-seo";

import { cx } from "@/lib/cx";
import type { MetaProps } from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  small?: boolean;
  light?: boolean;
  customMeta?: MetaProps;
  className?: string;
};

export function Layout(props: LayoutProps) {
  const { children, customMeta, small, light, className } = props;
  return (
    <>
      {customMeta && <NextSeo {...customMeta} />}
      <main
        className={cx(
          "flex min-h-screen w-full flex-col items-center gap-4 p-4  md:p-10 text-silver-50 bg-shark-800",
          light && "md:pt-0"
        )}
      >
        <div
          className={cx(
            "flex w-full flex-col gap-4 justify-center items-center",
            small ? "max-w-5xl" : "max-w-6xl",
            className
          )}
        >
          {children}
          {/* <Footer /> */}
        </div>
      </main>
    </>
  );
}
