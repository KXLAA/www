import { Section } from "@/components/common/Section";

export function Now() {
  return (
    <Section heading="Now" description="What im doing now">
      <div className="flex flex-col w-full gap-6"></div>
    </Section>
  );
}
