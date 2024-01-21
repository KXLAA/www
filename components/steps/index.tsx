"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownCircleIcon } from "lucide-react";
import React from "react";

import { cx } from "@/lib/cx";

import { StepContext, useSteps } from "./_state";

type Props = React.ComponentProps<typeof Accordion.Root> & {};

function Root(props: Props) {
  const { isShowingAll, open, toggleOpenAll } = useSteps();

  return (
    <Accordion.Root
      className="border border-gray-6 overflow-hidden"
      type="multiple"
      value={open}
    >
      <div className="p-2 border-b border-gray-6">
        <button
          className="flex gap-1 items-center text-lg text-gray-11 hover:text-gray-12 font-medium w-full"
          onClick={toggleOpenAll}
        >
          <ChevronDownCircleIcon
            strokeWidth={1.33}
            className={cx(
              "w-5 h-5 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300",
              isShowingAll ? "rotate-180" : "rotate-0"
            )}
          />
          <span>{isShowingAll ? "Hide" : "Show"} all</span>
        </button>
      </div>

      {props.children}
    </Accordion.Root>
  );
}

export default function Steps(props: Props) {
  const stepCount = React.Children.count(props.children);
  const [open, setOpen] = React.useState<string[]>([]);
  const steps = Array.from({ length: stepCount }, (_, i) => i + 1);

  const toggleOpenAll = () => {
    if (open.length === steps.length) {
      setOpen([]);
    } else {
      setOpen(steps.map((step) => `item-${step}`));
    }
  };

  const isShowingAll = open.length === stepCount;

  const toggleOpen = (id: number) => {
    if (open.includes(`item-${id}`)) {
      setOpen(open.filter((item) => item !== `item-${id}`));
    } else {
      setOpen([...open, `item-${id}`]);
    }
  };

  return (
    <StepContext.Provider
      value={{
        open,
        setOpen,
        toggleOpenAll,
        toggleOpen,
        isShowingAll,
      }}
    >
      <Root {...props} />
    </StepContext.Provider>
  );
}
