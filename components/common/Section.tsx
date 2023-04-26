type SectionProps = {
  heading: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export function Section(props: SectionProps) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-silver-800">
        {props.heading}
      </h2>
      <div className="flex flex-col gap-2">{props.children}</div>
    </div>
  );
}
