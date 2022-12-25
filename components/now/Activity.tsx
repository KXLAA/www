export function Activity() {
  return (
    <div className="w-full h-full max-w-sm overflow-hidden rounded-3xl bg-shark-800">
      <div className="flex flex-col p-4 h-44">
        <div className="flex items-center gap-2">
          <div className="flex flex-row items-center justify-center text-xl rounded-full w-11 h-11 bg-silver-800">
            K
          </div>

          <div className="flex flex-col">
            <p className="font-bold">2h 37m</p>
            <p className="text-xs font-light">Activity for 2022/12</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-20 bg-shark-600" />
    </div>
  );
}
