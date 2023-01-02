import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from "ariakit/disclosure";

import { cx } from "@/lib/cx";

type CalloutProps = {
  intent: "info" | "danger";
  children: React.ReactNode;
  heading?: string;
  dropdown?: boolean;
};

export function Dropdown(props: CalloutProps) {
  const disclosure = useDisclosureState();

  const { children, heading } = props;

  return (
    <aside
      className={cx(
        "p-3 w-full rounded-xl bg-shark-600 border-2 border-shark-500 text-silver-600 my-4"
      )}
    >
      <div className="flex flex-col gap-2">
        <Disclosure
          state={disclosure}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            <p className="m-0">{heading}</p>
          </div>

          <div
            className={cx(
              "rounded-full bg-shark-400 p-1 border-2 border-shark-400"
            )}
          >
            <ChevronDownIcon
              className={cx(
                "w-4 h-4",
                disclosure.open
                  ? "rotate-180 duration-300"
                  : "rotate-0 duration-300"
              )}
            />
          </div>
        </Disclosure>

        <DisclosureContent state={disclosure}>
          <div className="flex flex-col gap-4"> {children}</div>
        </DisclosureContent>
      </div>
    </aside>
  );
}
