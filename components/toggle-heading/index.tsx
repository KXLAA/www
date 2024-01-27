"use client";

import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useToggleHeading, ToggleHeadingContext } from "./_state";

type Props = React.ComponentProps<typeof Collapsible.Root>;

function Root(props: Props) {
  const { open, setOpen } = useToggleHeading();
  return (
    <Collapsible.Root
      {...props}
      open={open}
      onOpenChange={setOpen}
      className="mt-[60px]"
    >
      {props.children}
    </Collapsible.Root>
  );
}

export default function ToggleHeading(props: Props) {
  const [open, setOpen] = React.useState(true);

  return (
    <ToggleHeadingContext.Provider value={{ open, setOpen }}>
      <Root {...props} />
    </ToggleHeadingContext.Provider>
  );
}
