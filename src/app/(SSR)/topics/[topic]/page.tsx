import { UnsplashImage } from "@/models/UnsplashImage";
import Image from "next/image";
import React from "react";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

/**
 * These pages are rendered at first access and cached statically.
 * If want to generate new images in everytime search, use revalidate=0
 *
 */

interface PageProps {
  //url parameters
  params: { topic: string };
  //query parameters
  searchParams: { [key: string]: string | string[] | undefined };
}

//generate metadata dynamically
export function generateMetadata({
  params: { topic },
  searchParams,
}: PageProps): Metadata {
  //can also fetch data from API here
  return {
    title: `${topic} - NextJS 13.4 Image Gallery`,
  };
}

//tell NextJs to render some of the pages in advance. If know the keyworkds to search, then can export this function.
//this is the equivalent of getStaticPaths in old pages router. But this is simple because the return type is simple.
export function generateStaticParams() {
  //return should be an array of objects with parameter name as key
  //images for these topics will be fetched and cached in advance. There are rendered at build time.
  return ["health", "fitness", "coding", "computer"].map((topic) => ({
    topic,
  }));
}

//if only want to allow given dynamic parameters. Others search topic parameters will get 404.
//export const dynamicParams = false;

//if do not want to cache the data
//export const revalidate =0;

const TopicsPage = async ({ params: { topic }, searchParams }: PageProps) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();
  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Page that are not incluede in generateStaticParams will be fetched &
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>

      <h1>{topic}</h1>
      {images.map((image) => (
        <>
          <Image
            src={image.urls.small}
            width={250}
            height={250}
            alt={image.description}
            className={`rounded shadow mw-100 h-100 ${styles.image}`}
            key={image.id}
          />
        </>
      ))}
    </div>
  );
};

export default TopicsPage;
