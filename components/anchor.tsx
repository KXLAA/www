import { cx } from "@/lib/cx";

type AnchorProps = {
  name: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function Anchor(props: AnchorProps) {
  return (
    <a
      href={props.href}
      className={cx(
        "underline transition-all duration-150 hover:text-gray-12 underline-offset-2",
        props.className
      )}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
