import Image from "next/image";

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
