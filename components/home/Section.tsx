type SectionProps = {
  heading: string;
  description: string;
  children: React.ReactNode;
};

export function Section(props: SectionProps) {
  const { heading, description, children } = props;
  return (
    <div className="flex flex-col gap-4 p-3 border rounded-md md:p-4 border-cod-gray-400">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold">{heading}</p>
        <p className="text-xs text-silver-700">{description}</p>
      </div>

      {children}
    </div>
  );
}
