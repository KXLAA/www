import { Show } from "@/components/common/Show";
import { cx } from "@/lib/cx";

type SectionProps = {
  children: React.ReactNode;
  addon?: React.ReactNode;
  heading: string;
  description?: string;
  className?: string;
};

export function Section(props: SectionProps) {
  const { children, heading, description, addon, className } = props;
  return (
    <div
      className={cx(
        "shiny-border relative flex h-full w-full flex-col gap-6 self-start rounded-4xl bg-shark-900 p-7",
        className
      )}
    >
      <div className="flex justify-between pb-2 border-b border-shark-600">
        <div>
          <p className="text-sm font-black">{heading}</p>
          <p className="text-xl font-extralight">{description}</p>
        </div>
        <Show when={!!addon}>{addon}</Show>
      </div>
      {children}
    </div>
  );
}
