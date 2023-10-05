import Image from "next/image";

import { Button } from "@/components/bootstrap";

export default async function Home() {
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  return (
    <div>
      Hello NextJS <h1>/hello</h1>
    </div>
  );
}
