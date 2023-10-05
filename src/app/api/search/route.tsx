import { UnspashSearchResult } from "@/models/UnspashSearchResult";
import { NextResponse } from "next/server";

/**
 * in old pages directory had handler functions (had to check the method)
 * now new app route handlers have different functions for different HTTP methods
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  //if query is empty, send error
  if (!query) {
    //NextResponse extends Response functions
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  //send the API request to unsplash
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPASH_ACCESS_KEY}`
  );
  const { results }: UnspashSearchResult = await response.json();
  return NextResponse.json(results);
}
