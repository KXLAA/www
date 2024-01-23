import { cx } from "@/lib/cx";

type PageSectionProps = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function PageSection(props: PageSectionProps) {
  return (
    <div className="flex flex-col border-gray-6  border w-full border-b-0">
      <div className="p-4  bg-gray-2 flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl font-semibold">{props.title}</h2>
        {props.action && <div>{props.action}</div>}
      </div>

      <div className="flex flex-col">{props.children}</div>
    </div>
  );
}

type MainLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps) {
  return (
    <main
      className={cx(
        "flex min-h-screen flex-col items-start m-4 md:m-24 gap-10 md:max-w-3xl",
        props.className
      )}
    >
      {props.children}
    </main>
  );
}
