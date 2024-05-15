import { UnsplashImage } from "@/models/UnsplashImage";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Alert } from "@/components/bootstrap";
import Link from "next/link";

/***
 * Thi is like ISR in pagpes router
 * Cache the page statically but only for a certain time
 * This will cache the image for a certain time. After the time, when request it will show the same image. but fetches it in the background
 */

//this will use the description used by the layout. only change the title.
export const metadata: Metadata = {
  title: "Incremental Static  Regeneration - NextJS 13 Image Gallery",
};

//tell NextJS revalidate duration, to the whole page.
//export const revalidate = 15;

const DynamicPage = async () => {
  //can customize the fetch request according to the need of dynamic rendering
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPASH_ACCESS_KEY}`,
    {
      headers: {
        "Accept-Version": "v1",
      },

      //this next object added to the fetch by NextJs. NextJs enhance fetch with its own configurations.
      next: {
        revalidate: 15,
      },
    }
  );
  const image: UnsplashImage = await response.json();

  //calculate width and height
  const width = Math.min(500, image.width);
  const height = (width / image.height) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>incremental static regeneration.</strong>A new
        image is fetched every 15 seconds (after fefreshing the page) and then
        served from the cache for that duration..
      </Alert>

      <Image
        src={image?.urls?.small}
        width={width}
        height={height}
        alt={image?.description}
        className="rounded shadow mw-100 h-100"
      />

      <p>
        by{" "}
        <Link href={`/users/${image?.user?.username}`}>
          {image?.user?.username}
        </Link>
      </p>
    </div>
  );
};

export default DynamicPage;
