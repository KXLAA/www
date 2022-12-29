type TagProps = {
  children: React.ReactNode;
};

export function Tag(props: TagProps) {
  const { children } = props;
  return (
    <span className="flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-[#2A2A2A] rounded-md shadow-border-shiny  text-silver-600">
      {children}
    </span>
  );
}
