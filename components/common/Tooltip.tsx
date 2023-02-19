import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

import { cx } from "@/lib/cx";

type TooltipProps = {
  children: React.ReactNode;
  className?: string;
  content: React.ReactNode;
};

export function Tooltip(props: TooltipProps) {
  const { children, className, content } = props;
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={8}
          className={cx(
            "animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1",
            "z-50 overflow-hidden text-xs rounded-md text-silver-800 bg-shark-700 border-shark-600 border px-3 py-1 shadow-md ",
            className
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
