import Link from "next/link";
import { NextSeo } from "next-seo";

import { Show } from "@/components/common/Show";
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
  const { children, customMeta, hideHeader } = props;
  return (
    <>
      {customMeta && <NextSeo {...customMeta} />}
      <div
        className={cx(
          "flex min-h-screen w-full flex-col bg-shark-900 text-silver"
        )}
      >
        <Show when={!hideHeader}>
          <header className="flex justify-between p-10">
            <Link
              aria-current="page"
              className="!text-blue-500 font-medium"
              href="/"
            >
              kxlaa
            </Link>
            <nav className="flex gap-[1em]">
              <Link href="/about">Twitter</Link>
              <Link href="/work">Linkedin</Link>
              <Link href="/posts">Email</Link>
            </nav>
          </header>
        </Show>

        <main>{children}</main>
      </div>
    </>
  );
}
