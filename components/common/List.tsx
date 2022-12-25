import { CircleIcon } from "@radix-ui/react-icons";

import { cx } from "@/lib/cx";

type ListProps = {
  children: React.ReactNode;
  className?: string;
  type?: "ul" | "ol";
};

export function List(props: ListProps) {
  const { children, className, ...rest } = props;
  return (
    <ul className={cx("list-none", className)} {...rest}>
      {children}
    </ul>
  );
}

export function ListItem(props: React.ComponentProps<"li">) {
  const { children, className, ...rest } = props;
  return (
    <li className="flex items-start gap-2" {...rest}>
      <CircleIcon className="mt-1.5 shrink-0 text-silver-100" />
      {children}
    </li>
  );
}
