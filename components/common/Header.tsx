export function Header() {
  return (
    <header className="relative flex justify-between w-full shadow-border-shiny rounded-4xl p-7">
      <div className="flex flex-col gap-1">
        <p className="text-base font-black text-silver-50">KOLADE AFODE</p>

        <div className="flex flex-col gap-2 text-lg font-extralight text-silver-400 ">
          <p>
            Software Engineer with hands on experience in building client &
            server-side web applications using Typescript. Currently building
            products at{" "}
            <a
              href="https://www.zeiq.co/"
              className="text-silver-50 border-shark-600"
            >
              Zeiq
            </a>
            .
          </p>
        </div>
      </div>
    </header>
  );
}
