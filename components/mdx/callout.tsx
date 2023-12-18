"use client";

import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "@/lib/cx";

type CalloutIntent = "info" | "danger" | "default";

export type CalloutProps = {
  intent: CalloutIntent;
  children: React.ReactNode;
  heading?: string;
};

function Icon({ intent }: { intent: CalloutIntent }) {
  if (intent === "danger") {
    return <AlertTriangleIcon className="w-4 h-5 shrink-0" />;
  } else if (intent === "info") {
    return <InfoIcon className="w-5 h-5 shrink-0" />;
  } else {
    return null;
  }
}

export function Callout({ intent = "default", ...props }: CalloutProps) {
  return (
    <aside className={aside({ intent })}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Icon intent={intent} />
          <p className="m-0">{props.heading}</p>
        </div>
        <div
          className={cx(
            "flex flex-col gap-2 text-lg",
            intent === "danger" && "text-red-11",
            intent === "info" && "text-indigo-11",
            intent === "default" && "text-gray-11"
          )}
        >
          {props.children}
        </div>
      </div>
    </aside>
  );
}

export const aside = tv({
  base: "p-3 w-full my-6",
  variants: {
    intent: {
      info: "bg-indigo-2 border-2 border-indigo-4 !text-indigo-11",
      danger: "bg-red-2 border-2 border-red-4 text-red-11",
      default: "bg-gray-2 border-gray-6 border text-gray-12",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});
