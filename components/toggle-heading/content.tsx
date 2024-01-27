"use client";

import * as Collapsible from "@radix-ui/react-collapsible";

type Props = {
  children: React.ReactNode;
};

export default function Content({ children }: Props) {
  return <Collapsible.Content>{children}</Collapsible.Content>;
}
