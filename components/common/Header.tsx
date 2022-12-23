export function Header() {
  return (
    <header className="relative flex justify-between w-full shadow-border-shiny-2 rounded-4xl bg-shark-900 p-7">
      <div className="flex flex-col gap-4 ">
        <p className="pb-2 text-xl border-b font-extralight text-silver-50 border-shark-600">
          KOLADE AFODE
        </p>

        <div className="flex flex-col gap-2 text-lg font-extralight text-silver-400 ">
          <p>
            Painting beautiful interfaces. Enjoys lifting weights, evening
            walks, databases, Linux, Vim, and other random computer things.
          </p>
          <p>{`Feel free to
          check out my gear, or the music I've been listening to.`}</p>
        </div>
      </div>
    </header>
  );
}
