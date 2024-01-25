import { cx } from "@/lib/cx";
import NexLink from "next/link";

type AnchorProps = React.ComponentProps<"a"> & {
  name?: string;
};

export function Anchor(props: AnchorProps) {
  return (
    <a
      href={props.href}
      className={cx(
        "underline decoration-dashed decoration-green-10 transition-all duration-150 underline-offset-2",
        "hover:bg-green-5 hover:decoration-green-11",
        props.className
      )}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}

type Props = React.ComponentProps<typeof NexLink>;

export function Link({ className, ...props }: Props) {
  return (
    <NexLink
      className={cx(
        "underline decoration-dashed decoration-green-10 transition-all duration-150  underline-offset-2",
        "hover:bg-green-5 hover:decoration-green-11 w-fit",
        className
      )}
      {...props}
    >
      {props.children}
    </NexLink>
  );
}
