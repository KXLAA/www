import { LiveArea, useStatus } from "@/components/mdx/widgets/common/LiveArea";

export default function SortableDnd() {
  const [status] = useStatus();

  return (
    <LiveArea status={status}>
      <div className="flex flex-col items-center justify-center w-full h-full" />
    </LiveArea>
  );
}
