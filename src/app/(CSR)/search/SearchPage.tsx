"use client";
import { UnsplashImage } from "@/models/UnsplashImage";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./TopicPage.module.css";

/**
 * This page uses client-side data fetching using fetch and route handlers.
 * use SWR which does most of the nextJS server side featurs in client side *
 * for complex form handling, use react-hook-forms library if needed
 */

const SearchPage = () => {

  //state for search results
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
  //state for result loading
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  //state for error status
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =useState(false);

  //function to handle form submition
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    //take the input fields and wraps that into form data
    const formData = new FormData(e.target as HTMLFormElement);
    //get value out of formData
    const query = formData.get("query")?.toString().trim();

    //if query value is there, set states and call API
    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoading(true);
        setSearchResultsLoadingIsError(false);
        const response = await fetch(`/api/search?query=${query}`);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.log(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not
        leak API credentials, the request is sent to a NextJS{" "}
        <strong>route handler</strong> that runs on the server. This route
        handler then fetches the data from the Unsplash API and returns it to
        the client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control name="query" placeholder="E.g. cats, hotdogs, ..." />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingIsError && (
          <p>Something went wrong. Please try again.</p>
        )}
        {searchResults?.length === 0 && (
          <p>Nothing found. Try a different query!</p>
        )}
      </div>
      {searchResults &&
        searchResults.map((image) => (
          <Image
            src={image?.urls?.small}
            alt={image?.description}
            width={250}
            height={250}
            key={image?.id}
            className={styles?.image}
          />
        ))}
    </div>
  );
};

export default SearchPage;
