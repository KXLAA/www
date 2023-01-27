import {
  ChevronDownIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from "ariakit/disclosure";

import { AnimateHeight } from "@/components/animation/AnimateHeight";
import { cx } from "@/lib/cx";

type CalloutProps = {
  intent: "info" | "danger" | "default";
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
    ) : intent === "info" ? (
      <div
        className={cx(
          "rounded-full bg-[#192140] p-1 border-2 border-[#1C274F]"
        )}
      >
        <QuestionMarkCircledIcon className="w-4 h-4 shrink-0" />
      </div>
    ) : null;

  return dropdown ? (
    <aside
      className={cx(
        "p-3 w-full rounded-xl my-6",
        intent === "danger" &&
          "bg-[#291415] border-2 border-[#481A1D] text-[#FF6369]",
        intent === "info" &&
          "bg-[#15192D] border-2 border-[#1C274F] !text-[#849DFF]",
        intent === "default" &&
          "bg-shark-600 border-shark-500 border-2 text-silver-600"
      )}
    >
      <div className="flex flex-col">
        <Disclosure
          state={disclosure}
          className="flex items-center justify-between w-full"
        >
          <div className={cx("flex items-center gap-2 text-xl font-semibold")}>
            {icon}
            <p className="m-0">{heading}</p>
          </div>

          <div
            className={cx(
              "rounded-full bg-[#192140] p-1 border-2 border-[#1C274F]",
              intent === "danger" &&
                "bg-[#3C181A] p-1 border-2 border-[#481A1D]",
              intent === "default" && "bg-shark-400 p-1 border-shark-300"
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
        <>
          <DisclosureContent
            state={disclosure}
            as={AnimateHeight}
            isVisible={disclosure.open}
          >
            <div className="flex flex-col gap-6 text-lg mt-4"> {children}</div>
          </DisclosureContent>
        </>
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
        <div className="flex flex-col gap-2 text-lg"> {children}</div>
      </div>
    </aside>
  );
}
