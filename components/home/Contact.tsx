import { Section } from "@/components/common/Section";
import { Show } from "@/components/common/Show";
import { useFeature } from "@/lib/flags";

export function Contact() {
  const isFeatureEnabled = useFeature("contact");
  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Contact">
        <p className="text-base font-extralight text-silver-700">
          Reach me at{" "}
          <ConnectLink name="Twitter" href="https://twitter.com/kxlaa_">
            @kxlaa_
          </ConnectLink>
          or{" "}
          <ConnectLink
            name="Email"
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          >
            Email
          </ConnectLink>
          . You can view my code{" "}
          <ConnectLink name="GitHub" href="https://github.com/KXLAA">
            @kxlaa
          </ConnectLink>{" "}
          on GitHub.
        </p>
      </Section>
    </Show>
  );
}

type ConnectLinkProps = {
  name: string;
  href: string;
  children: React.ReactNode;
};

function ConnectLink(props: ConnectLinkProps) {
  return (
    <a
      key={props.name}
      href={props.href}
      className="text-base font-normal underline text-silver-700 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy"
      target="_blank"
      rel="noreferrer"
      data-splitbee-event={`Click on ${props.name}`}
    >
      {props.children}
    </a>
  );
}
