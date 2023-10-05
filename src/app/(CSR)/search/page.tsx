import { Metadata } from "next";
import React from "react";
import SearchPage from "./SearchPage";

//metadata has to be exported from the server component.
export const metadata: Metadata = {
  title: "Search - NextJS 13 Image Gallery",
};

/**
 *
 * can import client components in to server components.
 * can fetch data in server component and pass them to the client component
 * 
 */

const Page = () => {
  return <SearchPage />;
};

export default Page;
