import { UnsplashImage } from "./UnsplashImage";

export interface UnspashSearchResult {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}
