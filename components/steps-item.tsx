"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownCircleIcon } from "lucide-react";

import { cx } from "@/lib/cx";

import { useSteps } from "./steps";

export default function Item(
  props: React.ComponentProps<typeof Accordion.Item> & {
    no: number;
    heading: string;
  }
) {
  const { toggleOpen } = useSteps();

  return (
    <Accordion.Item
      value={`item-${props.no}`}
      className={cx("border-b last:border-b-0 border-gray-6 group")}
    >
      <Accordion.Header className="m-0 p-3 border-b border-transparent group-data-[state=open]:border-gray-6 bg-gray-2">
        <Accordion.Trigger
          className="flex justify-between w-full"
          onClick={() => toggleOpen(props.no)}
        >
          <div className="flex gap-2 items-center">
            <span className="border border-gray-8 rounded-full aspect-square text-base bg-gray-3  w-7 h-7 flex items-center justify-center font-bold text-gray-11">
              <span>{props.no}</span>
            </span>
            <span
              className={cx(
                "text-lg text-gray-11 group-hover:text-gray-12 font-semibold"
              )}
            >
              {props.heading}
            </span>
          </div>

          <ChevronDownCircleIcon
            strokeWidth={1.22}
            className="text-gray-6 group-hover:text-gray-11 w-8 h-8 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={cx("px-4 bg-gray-1")}>
        {props.children}
      </Accordion.Content>
    </Accordion.Item>
  );
}
