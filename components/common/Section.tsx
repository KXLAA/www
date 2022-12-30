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
        "max-w-[540px] flex flex-col gap-4 w-full bg-shark-700 p-6 rounded-xl shadow-border-shiny",
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
