export type CalloutVariant = "info" | "danger";

type CalloutProps = {
  variants: CalloutVariant;
};

export function Callout(props: CalloutProps) {
  return <div>Callout</div>;
}
