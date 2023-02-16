import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { cx } from "@/lib/cx";

type ExperimentCardProps = ExperimentsType & {
  size?: "sm" | "md";
};

export function ExperimentCard(props: ExperimentCardProps) {
  const { title, slug, webm, mp4, size } = props;
  return (
    <Link
      href={`/experiments/${slug}`}
      className={cx(
        "group relative flex flex-col gap-1.5 overflow-hidden transition-colors border rounded-md",
        size === "sm" && "gap-0.5",
        "border-cod-gray-300 hover:border-cod-gray-400 bg-cod-gray-500"
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
          "flex justify-between items-center w-full px-3 py-1 text-base font-normal bg-cod-gray-600",
          size === "sm" && "text-xs"
        )}
      >
        <div className="flex flex-col">
          <span>{title}</span>
          <span
            className={cx(
              "text-sm text-silver-700",
              size === "sm" && "text-xs text-[10px]"
            )}
          >
            2022
          </span>
        </div>

        <span
          className={cx(
            "flex items-center justify-center w-8 h-8 transition border rounded-full text-silver-800 bg-shark-700 border-shark-600 group-hover:border-shark-500",
            size === "sm" && "w-5 h-5"
          )}
        >
          <ArrowRight
            className={cx(
              "w-5 h-5 text-silver-700 group-hover:text-silver transition-colors",
              size === "sm" && "w-3 h-3"
            )}
          />
        </span>
      </div>
    </Link>
  );
}
