import Image from "next/image";

import {Button } from "@/components/bootstrap"

export default async function Home() {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  return <div>Hello this is register page. <Button>Test</Button></div>;
}
