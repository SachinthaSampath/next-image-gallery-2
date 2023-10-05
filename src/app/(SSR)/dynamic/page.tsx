import { UnsplashImage } from "@/models/UnsplashImage";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Alert } from "@/components/bootstrap";
import Link from "next/link";

/***
 * This behaves like getServersideProps() in pages router
 * this is the equivalant of getServerSideProps() in pages router. Request to the server happen every time.
 */

//this will use the description used by the layout. only change the title.
export const metadata: Metadata = {
  title: "Dynamic fetching - NextJS 13 Image Gallery",
};

//tell NextJS revalidate duration
//export const revalidate = 0;

const DynamicPage = async () => {
  //can customize the fetch request according to the need of dynamic rendering
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPASH_ACCESS_KEY}`,
    {
      headers: {
        "Accept-Version": "v1",
      },

      //no-cache no-store both doe the same as revalidate=0 in different fetch calls
      //cache: "no-cache",

      //this next object added to the fetch by NextJs. NextJs enhance fetch with its own configurations.
      next: {
        revalidate: 0,
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
        This page <strong>fetches data dynamically.</strong> Every time you
        refresh the page, you get a new image from the Unsplash API.
      </Alert>

      <Image
        src={image.urls.small}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />

      <p>
        by{" "}
        <Link href={`/users/${image.user.username}`}>
          {image.user.username}
        </Link>
      </p>
    </div>
  );
};

export default DynamicPage;
