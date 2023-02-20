import Image from "next/image";

export function Projects() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.link} {...project} />
      ))}
    </div>
  );
}

type ProjectCardProps = {
  title: string;
  description?: string;
  link: string;
  image: string;
};

export function ProjectCard(props: ProjectCardProps) {
  const { title, description, link, image } = props;

  return (
    <a
      href={link}
      className="flex flex-col w-full gap-3 overflow-hidden transition-colors border rounded-md bg-cod-gray-600 border-cod-gray-400 hover:border-cod-gray-200"
      target="_blank"
      rel="noreferrer"
      data-splitbee-event={`Click on ${title}`}
    >
      <Image
        src={image}
        alt={title}
        width={2000}
        height={630}
        placeholder="blur"
        blurDataURL={image}
      />
      <div className="flex flex-col justify-center gap-1 p-2 pt-0 text-sm font-light">
        <span>{title}</span>

        <span className="text-xs text-silver-700">{description}</span>
      </div>
    </a>
  );
}

const PROJECTS = [
  {
    title: "Nartefacts",
    description:
      "Color pallette's inspired by the vibrant colors of African music.",
    link: "https://www.nartefacts.com/",
    image: "https://ucarecdn.com/85a59495-37d7-4fd0-b128-482cdbf43445/",
  },
  {
    title: "DevPortfolios",
    description: "The most beautiful developer portfolios on the web.",
    link: "https://www.devportfolios.dev/",
    image: "https://ucarecdn.com/4d9faa95-0f9d-4889-b6a4-f3e2ecd5adf0/",
  },
];
