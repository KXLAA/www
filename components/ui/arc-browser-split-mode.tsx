export default function ArcBrowserSplitMode() {
  return (
    <div className="bg-gray-2 h-[720px] relative w-[1080px] border border-gray-3 flex p-2 gap-2">
      <div className="h-full w-2/12 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input className="bg-gray-3 rounded-md shadow" />

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-3 aspect-square w-full rounded shadow"
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-3 h-8 w-full rounded"></div>
          ))}
        </div>
      </div>
      <div className="bg-gray-3 h-full w-10/12 rounded shadow-md"></div>
    </div>
  );
}
