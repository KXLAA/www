import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import { useFeature } from "@/lib/flags";

type PostsProps = {
  contacts: Array<{ name: string; href: string }>;
};

export function Contact(props: PostsProps) {
  const isFeatureEnabled = useFeature("contact");
  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Contact">
        <div className="grid grid-cols-1 gap-2">
          {props.contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              className="flex gap-3 text-base font-normal text-silver-700 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy"
              target="_blank"
              rel="noreferrer"
              data-splitbee-event={`Click on ${contact.name}`}
            >
              {contact.name}
            </a>
          ))}
        </div>
      </Section>
    </Show>
  );
}
