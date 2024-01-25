import { cx } from "@/lib/cx";

type MainLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps) {
  return (
    <main
      className={cx(
        "flex flex-col items-start m-4 md:m-24 gap-10 max-w-2xl text-2xl md:text-3xl md:mb-0 md:pb-12",
        props.className
      )}
    >
      {props.children}
    </main>
  );
}
