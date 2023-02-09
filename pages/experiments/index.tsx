import { Layout } from "@/components/common/Layout";

export default function Experiments() {
  return (
    <Layout className="gap-3 p-3 columns-3" key="home-page">
      <img
        className="w-full mb-3 aspect-video"
        src="https://picsum.photos/500/300?random=1"
      />
      <img
        className="w-full mb-3 aspect-square"
        src="https://picsum.photos/500/300?random=2"
      />
      <img
        className="w-full mb-3 aspect-square"
        src="https://picsum.photos/500/300?random=3"
      />
      <img
        className="w-full mb-3 aspect-square"
        src="https://picsum.photos/500/300?random=4"
      />
      <img
        className="w-full mb-3 aspect-video"
        src="https://picsum.photos/500/300?random=5"
      />
      <img
        className="w-full mb-3 aspect-video"
        src="https://picsum.photos/500/300?random=6"
      />
      <img
        className="w-full mb-3 aspect-square"
        src="https://picsum.photos/500/300?random=7"
      />
      <img
        className="w-full mb-3 aspect-video"
        src="https://picsum.photos/500/300?random=8"
      />
      <img
        className="w-full mb-3 aspect-square"
        src="https://picsum.photos/500/300?random=9"
      />
    </Layout>
  );
}
