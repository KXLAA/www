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
        <div className="grid grid-cols-1 gap-2">
          {props.contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              className="flex gap-3 text-silver-700"
              target="_blank"
              rel="noreferrer"
              data-splitbee-event={`Click on ${contact.name}`}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <p className="text-base font-normal">{contact.name}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </Show>
  );
}
