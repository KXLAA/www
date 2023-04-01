import { Logo } from "@/components/common/Logo";

type AvatarProps = {
  status?: "online" | "offline";
};

export function Avatar(props: AvatarProps) {
  return (
    <div className="relative flex items-center justify-center p-3 rounded-full aspect-square shadow-border-shiny bg-cod-gray-500">
      <Logo className="w-6 h-6 text-silver-700" />
      <div className="absolute right-0 flex items-center justify-center w-4 h-4 rounded-full bg-cod-gray-700 bottom-[-1px]">
        <span className="text-[8px] text-silver-700">🔥</span>
      </div>
    </div>
  );
}
