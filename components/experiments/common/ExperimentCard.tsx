import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { cx } from "@/lib/cx";

type ExperimentCardProps = ExperimentsType & {
  size?: "sm" | "md";
};

export function ExperimentCard(props: ExperimentCardProps) {
  const { heading, slug, webm, mp4, size } = props;
  return (
    <Link
      href={`/experiments/${slug}`}
      className={cx(
        "relative flex flex-col gap-1.5 overflow-hidden transition-colors border rounded-md border-cod-gray-400 bg-cod-gray-500",
        size === "sm" && "gap-0.5"
      )}
    >
      <div
        className={cx(
          "flex flex-col p-1.5 pb-0",
          size === "sm" && "p-0.5 pb-0"
        )}
      >
        <video
          loop
          muted
          className="rounded rounded-b-0"
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
          playsInline
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      </div>
      <div
        className={cx(
          "flex justify-between w-full px-3 py-1 text-base font-normal bg-cod-gray-600",
          size === "sm" && "text-xs"
        )}
      >
        <div className="flex flex-col">
          <span>{heading}</span>
          <span
            className={cx(
              "text-sm text-silver-700",
              size === "sm" && "text-xs text-[10px]"
            )}
          >
            2022
          </span>
        </div>

        <ArrowRight />
      </div>
    </Link>
  );
}
