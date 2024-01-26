"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { useToggleHeading } from "./_state";
import { cx } from "@/lib/cx";

type Props = {
  children: React.ReactNode;
};

export default function Title({ children }: Props) {
  const { open, setOpen } = useToggleHeading();

  return (
    <div className="flex justify-between [&>*]:m-0 items-center">
      {children}

      <Collapsible.Trigger className="hover:bg-gray-2 transition-colors duration-150 ease-in-out">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cx(
            "w-10 h-10  ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-150",
            open ? "rotate-180" : "rotate-0"
          )}
        >
          <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
        </svg>
      </Collapsible.Trigger>
    </div>
  );
}
