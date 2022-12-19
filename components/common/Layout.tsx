import { Footer } from "@/components/common/Footer";
import { Head } from "@/components/common/Head";
import { cx } from "@/lib/cx";
import type { MetaProps } from "@/types/layout";

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
      <Head customMeta={customMeta} />
      <main
        className={cx(
          "flex min-h-screen w-full flex-col items-center gap-4 p-4  md:p-10 text-silver-50 ",
          light ? "bg-[#0c0c0c]" : "bg-black"
        )}
      >
        <div
          className={cx(
            "flex w-full flex-col gap-4",
            small ? "max-w-4xl" : "max-w-6xl",
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
