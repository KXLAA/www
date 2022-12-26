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
        "shadow-border-shiny relative flex h-full w-full flex-col gap-6 self-start rounded-4xl p-7",
        className
      )}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-base font-black">{heading}</p>
          <p className="text-lg font-extralight text-silver-400">
            {description}
          </p>
        </div>
        <Show when={!!addon}>{addon}</Show>
      </div>
      {children}
    </div>
  );
}
