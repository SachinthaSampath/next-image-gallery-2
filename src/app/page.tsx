import Image from "next/image";

import { Alert, Button } from "@/components/bootstrap";

export default async function Home() {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  return (
    <div>
      <Alert>
        <p>
          This is a sample project to showcase and learn the new NextJS app
          directory and its features, including:
        </p>
        <ul>
          <li>static and dynamic server-side rendering</li>
          <li>incremental static regeneration</li>
          <li>client-side rendering</li>
          <li>route handlers (API endpoints)</li>
          <li>meta-data API</li>
          <li>and more</li>
        </ul>
        <p>
          Every page uses a different approach to fetching and caching data.
          Click the links in the nav bar to try them out.
        </p>
      </Alert>
    </div>
  );
}
