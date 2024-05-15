import { UnsplashImage } from "@/models/UnsplashImage";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Alert } from "@/components/bootstrap";

/***
 * This behaves like getStaticProps() in pages router
 */

//this will use the description used by the layout. only change the title.
export const metadata: Metadata = {
  title: "Static fetching - NextJS 13 Image Gallery",
};

const StaticPage = async () => {

  //server component runs only on server. Only have value if prefix with NEXT_PUBLIC
  //fetch will give the cached result. But when hard reload browser, also the fetch request refreshes.
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPASH_ACCESS_KEY}`,
    { headers: { "Accept-Version": "v1" } }
  );
  const image: UnsplashImage = await response.json();

  //calculate width and height
  const width = Math.min(500, image.width);
  const height = (width / image.height) * image.height;

  // console.log("new url - ", image.urls.raw);
  // image.urls.raw =
  //   "https://images.unsplash.com/photo-1695529741777-164f2f73236d?ixid=M3w0OTA1MjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTY1MTE5MzR8&ixlib=rb-4.0.3";
  // image.urls.raw =
  //   "https://images.unsplash.com/photo-1694742971702-3887ed069538?ixid=M3w0OTA1MjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTY1MTIxMjl8&ixlib=rb-4.0.3";
  // console.log("old url - ", image.urls.raw);

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <b>fetches and caches data at build time</b>. Even though the
        Unsplash API always returns a new image, we see the same image after
        refreshing the page until we compile the project again.
      </Alert>

      <Image
        src={image.urls?.raw}
        width={width}
        height={height}
        alt={image?.description}
        className="rounded shadow mw-100 h-100"
      />
      <p>
        by{" "}
        <Link href={`/users/${image.user?.username}`}>
          {image.user?.username}
        </Link>
      </p>
    </div>
  );
};

export default StaticPage;
