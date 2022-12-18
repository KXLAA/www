type TagProps = {
  children: React.ReactNode;
};

export function Tag(props: TagProps) {
  const { children } = props;
  return (
    <span className="flex items-center justify-center px-2 py-1 text-xs font-light border rounded-full border-shark-500 bg-shark-700 text-silver">
      {children}
    </span>
  );
}
