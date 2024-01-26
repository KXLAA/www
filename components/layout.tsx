import { cx } from "@/lib/cx";

type MainLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps) {
  return (
    <main
      className={cx(
        "flex flex-col items-start mx-auto my-8 md:my-20 gap-10 max-w-2xl text-2xl md:text-3xl px-4 md:px-0",
        props.className
      )}
    >
      {props.children}
    </main>
  );
}
