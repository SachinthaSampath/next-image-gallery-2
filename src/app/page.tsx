import Image from "next/image";

export default async function Home() {
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  return <div>Hello NextJS</div>;
}
