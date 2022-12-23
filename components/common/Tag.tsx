type TagProps = {
  children: React.ReactNode;
};

export function Tag(props: TagProps) {
  const { children } = props;
  return (
    <span className="flex items-center justify-center px-2 py-0.5 text-xs font-light rounded-full shadow-border-shiny bg-shark-900 text-silver-700">
      {children}
    </span>
  );
}
