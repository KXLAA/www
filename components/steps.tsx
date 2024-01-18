"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownCircleIcon, ChevronDownIcon } from "lucide-react";
import React from "react";

import { cx } from "@/lib/cx";

type Step = {
  no: number;
  heading: string;
  content: React.ReactNode;
};

type StepsProps = {
  steps: Array<Step>;
};

export function Steps(props: StepsProps) {
  const [open, setOpen] = React.useState<string[]>([]);
  const toggleOpenAll = () => {
    if (open.length === props.steps.length) {
      setOpen([]);
    } else {
      setOpen(props.steps.map((step) => `item-${step.no}`));
    }
  };

  const isShowingAll = open.length === props.steps.length;

  return (
    <Accordion.Root
      className="bg-gray-2 border border-gray-6 overflow-hidden"
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

      {props.steps.map((step) => {
        return (
          <Accordion.Item
            value={`item-${step.no}`}
            key={step.no}
            className={cx("border-b last:border-b-0 border-gray-6 group")}
            onClick={() => {
              if (open.includes(`item-${step.no}`)) {
                setOpen(open.filter((item) => item !== `item-${step.no}`));
              } else {
                setOpen([...open, `item-${step.no}`]);
              }
            }}
          >
            <Accordion.Header className="m-0 p-3 border-b border-transparent group-data-[state=open]:border-gray-6">
              <Accordion.Trigger className="flex justify-between w-full">
                <div className="flex gap-2 items-center">
                  <span className="border border-gray-8 rounded-full aspect-square text-base bg-gray-3  w-7 h-7 flex items-center justify-center font-bold text-gray-11">
                    <span>{step.no}</span>
                  </span>
                  <span
                    className={cx(
                      "text-lg text-gray-11 group-hover:text-gray-12 font-semibold"
                    )}
                  >
                    {step.heading}
                  </span>
                </div>

                <ChevronDownCircleIcon
                  strokeWidth={1.22}
                  className="text-gray-6 group-hover:text-gray-11 w-8 h-8 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className={cx("p-3 bg-gray-1")} {...props}>
              {step.content}
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}
