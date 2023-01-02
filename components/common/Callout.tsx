import {
  //   InfoCircledIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
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

export function Callout(props: CalloutProps) {
  const disclosure = useDisclosureState();

  const { intent, children, heading, dropdown } = props;
  const icon =
    intent === "danger" ? (
      <div className="rounded-full bg-[#3C181A] p-1 border-2 border-[#481A1D]">
        <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
      </div>
    ) : (
      <div
        className={cx(
          "rounded-full bg-[#192140] p-1 border-2 border-[#1C274F]"
        )}
      >
        <QuestionMarkCircledIcon className="w-4 h-4 shrink-0" />
      </div>
    );

  return dropdown ? (
    <aside
      className={cx(
        "p-3 w-full rounded-xl ",
        intent === "danger" &&
          "bg-[#291415] border-2 border-[#481A1D] text-[#FF6369]",
        intent === "info" &&
          "bg-[#15192D] border-2 border-[#1C274F] !text-[#849DFF]"
      )}
    >
      <div className="flex flex-col gap-2">
        <Disclosure
          state={disclosure}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            {icon}
            <p className="m-0">{heading}</p>
          </div>

          <div
            className={cx(
              "rounded-full bg-[#192140] p-1 border-2 border-[#1C274F]",
              intent === "danger" &&
                "bg-[#3C181A] p-1 border-2 border-[#481A1D]"
            )}
          >
            <ChevronDownIcon
              className={cx(
                "w-4 h-4",
                disclosure.open ? "transform rotate-180" : ""
              )}
            />
          </div>
        </Disclosure>

        <DisclosureContent state={disclosure}>{children}</DisclosureContent>
      </div>
    </aside>
  ) : (
    <aside
      className={cx(
        "p-3 w-full rounded-xl ",
        intent === "danger" &&
          "bg-[#291415] border-2 border-[#481A1D] text-[#FF6369]",
        intent === "info" &&
          "bg-[#15192D] border-2 border-[#1C274F] !text-[#849DFF]"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-bold">
          {icon}
          <p className="m-0">{heading}</p>
        </div>
        <div>{children}</div>
      </div>
    </aside>
  );
}
