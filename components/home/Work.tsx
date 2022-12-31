// import { ArrowTopRightIcon } from "@radix-ui/react-icons";
// import Image from "next/image";

// import { Section } from "@/components/common/Section";

export function Work() {
  // const projectLength = data.length;
  return (
    <section
      className="max-w-[540px] flex flex-col gap-4 w-full bg-shark-700 p-6 rounded-xl shadow-border-shiny"
      id="work"
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-medium">WORK</h2>
          <p className="font-extralight">I build some cool web stuff</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 gird">
        {data.map((d) => (
          <a
            className="flex flex-col items-center justify-center w-full gap-2 p-4 transition-all rounded-xl bg-shark-500 hover:shadow-border-shiny h-44"
            key={d.url}
            href={d.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex justify-center w-full gap-4 font-black">
              <div className="flex flex-col gap-1">
                <p className="text-xl">{d.title}</p>
              </div>
            </div>
            {/* 
          <div className="flex items-center justify-between w-full gap-4 p-0 overflow-hidden transition-colors shadow-md h-60 bg-shark-900">
            <Image
              src={d.poster || ""}
              alt={d.title}
              width={1400}
              height={400}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div> */}
          </a>
        ))}
      </div>
    </section>
  );
}

const data = [
  {
    title: `Nartefacts`,
    url: `https://www.nartefacts.com/`,
    description: `Discover colour pallette's inspired by the vibrant colours of African music. Like, share & create.`,
    poster: `https://ucarecdn.com/502b059a-0e49-473b-9c47-afd61afc7ef7/nartefacts.webp`,
    videoMp4: `https://ucarecdn.com/cbf7ce25-e0a4-405f-87b4-e58b2e7af1e0/nartefactsnew.mp4`,
    videoWebm: `https://ucarecdn.com/e861d562-46a0-4070-bd7a-bbf527a9c32e/nartefactsnew.webm`,
    tech: [`Mongo DB`, `GraphQL`, `Typescript`, `Next.js`, `Prisma`, `AWS S3`],
  },

  {
    title: `DevPortfolios`,
    url: `https://www.devportfolios.dev/`,
    description: `Discover the most beautiful developer portfolios on the web. Be inspired, build yours.`,
    poster: `https://ucarecdn.com/b79cbe30-a724-4c55-9a1e-e6a3004ce078/devportfolios.webp`,
    videoMp4: `https://ucarecdn.com/d27c9cf5-a131-49e9-b462-501aa324ef86/devportfolios.mp4`,
    videoWebm: `https://ucarecdn.com/a6098d11-0da7-4680-9315-c65a0a2fe495/devportfolios.webm`,
    tech: [`GraphCMS`, `GraphQL`, `Typescript`, `Next.js`, `Styled-Components`],
  },
  // {
  //   title: ` Front-End Cardio`,
  //   url: `https://frontendcardio.vercel.app/`,
  //   description: `A collection of some of the best  challenge & tutorial projects i completed.`,
  //   poster: `https://ucarecdn.com/a85db1c9-4652-485e-b507-41997a7106e9/frontendcardio.webp`,
  //   videoMp4: `https://ucarecdn.com/5ca69719-8a2b-40ae-9f62-3feacea8f4a5/frontendcardio.mp4`,
  //   videoWebm: `https://ucarecdn.com/c3475aa3-7ba4-4e60-9768-73cda55e9d6d/frontendcardio.webm`,
  //   tech: [`GraphCMS`, `GraphQL`, `Typescript`, `Next.js`, `Styled-Components`],
  // },
];
