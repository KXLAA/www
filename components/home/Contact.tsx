import { ArrowUpRight, CheckCircle2, Copy } from "lucide-react";

import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import { cx } from "@/lib/cx";
import { useFeature } from "@/lib/flags";
import { useCopyEmail } from "@/lib/hooks/use-copy-email";

type PostsProps = {
  contacts: Array<{ name: string; href: string }>;
};

export function Contact(props: PostsProps) {
  const isFeatureEnabled = useFeature("contact");
  const { copyEmail, copied } = useCopyEmail();

  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Contact">
        <div className="grid grid-cols-2 gap-2">
          {props.contacts.map((contact) =>
            contact.name === "Email" ? (
              <button
                key={contact.name}
                className="flex gap-3"
                onClick={copyEmail}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-normal underline text-silver-600 hover:decoration-dotted">
                      {contact.name}
                    </p>
                    {copied ? (
                      <CheckCircle2
                        className={cx("w-4 h-4 text-silver-600")}
                        strokeWidth={1.22}
                      />
                    ) : (
                      <Copy
                        className={cx(
                          "w-4 h-4 text-silver-600 transition-colors hover:text-silver-800"
                        )}
                        strokeWidth={1.22}
                      />
                    )}
                  </div>
                </div>
              </button>
            ) : (
              <a
                key={contact.name}
                href={contact.href}
                className="flex gap-3"
                target="_blank"
                rel="noreferrer"
                data-splitbee-event={`Click on ${contact.name}`}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-normal underline text-silver-600 hover:decoration-dotted">
                      {contact.name}
                    </p>
                    <ArrowUpRight
                      className={cx("w-4 h-4 text-silver-600")}
                      strokeWidth={1.22}
                    />
                  </div>
                </div>
              </a>
            )
          )}
        </div>
      </Section>
    </Show>
  );
}
