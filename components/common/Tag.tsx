type TagProps = {
  children: React.ReactNode;
};

export function Tag(props: TagProps) {
  const { children } = props;
  return (
    <span className="flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-shark-400 rounded-md text-silver-600">
      {children}
    </span>
  );
}
