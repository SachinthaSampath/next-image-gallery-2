import { UnsplashUser } from "@/models/UnsplashUser";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { Alert } from "@/components/bootstrap";

//page props
interface PageProps {
  params: {
    userName: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
  //[key: string]: This part specifies that the object can have keys that are strings.
  //string | string[] | undefined: This part specifies the allowed types of values
}

//function to get user from API
async function getUser(userName: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${userName}?client_id=${process.env.UNSPASH_ACCESS_KEY}`
  );

  //fetch does not throw errors by default
  if (response.status === 404) {
    //earlier redirected with special return value from getStaticProps or getServerSideProps
    //in app directory, simply call notFound()
    notFound();
  }

  return await response.json();
}

//if not using fetch, data will not be cached. Then can use this. Use cache if not using the native fetch
// const getUserCached = cache(getUser);

//create and export function to generate metadata (old pages route set the metadata in the head tag directly in page component)
export async function generateMetadata({
  params: { userName },
  searchParams,
}: PageProps) {
  const user = await getUser(userName);
  //return metadata object (filter thruthy values)
  return {
    title:
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username + " - NextJS 13.4 Image Gallery",
  };
}

const UserPage = async ({ params: { userName }, searchParams }: PageProps) => {
  //get user from function
  const user = await getUser(userName);
  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>First name : {user.first_name}</p>
      <p>Last name : {user.last_name}</p>
      <a href={`https://unsplash.com/${user.username}`}>Unsplash Profile</a>
    </div>
  );
};

export default UserPage;
