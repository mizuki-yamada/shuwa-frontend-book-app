import React, { useEffect, useState } from "react";
import { Book } from "../types/Book";
import BookList from "./BookList";
import styled from "styled-components";

const Page = styled.div`
  margin: 0 auto;
  width: 700px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
`;

export default function Timeline() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://localhost:1323/books")
      .then<Book[]>((response) => response.json())
      .then((books) => setBooks(books));
  }, []);

  return (
    <Page>
      <Title>タイムライン</Title>
      <BookList books={books}></BookList>
    </Page>
  );
}
