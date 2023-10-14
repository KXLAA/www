import { cx } from "@/lib/cx";

type ConnectLinkProps = {
  name: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ConnectLink(props: ConnectLinkProps) {
  return (
    <a
      key={props.name}
      href={props.href}
      className={cx(
        "underline transition-all duration-200 hover:text-gray-dark-11 underline-offset-2",
        props.className
      )}
      target="_blank"
      rel="noreferrer"
      data-splitbee-event={`Click on ${props.name}`}
    >
      {props.children}
    </a>
  );
}
