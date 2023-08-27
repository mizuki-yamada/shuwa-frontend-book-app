import { Review } from "./Review";

export type Book = {
  id: number;
  title: string;
  author: string;
  overview: string;
  image: string;
  reviews: Review[];
};
