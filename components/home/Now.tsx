import { Section } from "@/components/common/Section";
import { Activity } from "@/components/now/Activity";
import { Gauge } from "@/components/now/Gauge";

export function Now() {
  return (
    <Section heading="Now" description="What im doing now">
      <div className="flex w-full gap-6">
        <Gauge value={80} />
        <Activity />
      </div>
    </Section>
  );
}
