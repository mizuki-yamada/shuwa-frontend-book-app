import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { Book } from "../types/Book";
import { Review } from "../types/Review";
import ReviewList from "./ReviewList";

async function postReview(comment: string): Promise<Review> {
  return fetch("http://localhost:1323/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  }).then<Review>((response) => response.json());
}

const Item = styled.li`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  padding: 30px;
`;

const InnerImage = styled.div`
  display: flex;
`;

const InnerInfo = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const InnerInfoTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0;
`;

const InnerInfoTitleAuthor = styled.span`
  font-size: 1.1rem;
`;

const InnerInfoOverview = styled.p`
  color: #666;
  font-size: 0.8rem;
  margin: 0;
`;

const InnerInfoComment = styled.p`
  font-size: 1rem;
  margin: 0;
  text-align: right;
`;

const InnerInfoCommentLink = styled.a`
  color: #000;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

const Review = styled.div`
  max-height: 0;
  overflow-y: hidden;
`;

const ReviewForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0 0;
`;

const ReviewFormInput = styled.textarea`
  border-color: #d6d6d6;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 1rem;
  margin: 0;
  padding: 8px;
  width: 100%;
`;

const ReviewFormSubmit = styled.button`
  background-color: #0ae;
  border: 0;
  border-radius: 3px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
  padding: 10px 0;
  width: 100%;
`;

function BookListItem({ book }: { book: Book }) {
  const [showReview, setShowReview] = useState(false);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(book.reviews);

  const handleSubmit = async () => {
    const review = await postReview(comment);
    setReviews(reviews.concat([review]));
    setComment("");
  };

  return (
    <Item key={book.id}>
      <InnerImage>
        <img
          className="book-list__item__inner__image"
          src={book.image}
          alt={book.title}
        />
        <InnerInfo>
          <InnerInfoTitle>
            {book.title}
            <InnerInfoTitleAuthor>({book.author})</InnerInfoTitleAuthor>
          </InnerInfoTitle>
          <InnerInfoOverview>{book.overview}</InnerInfoOverview>
          <InnerInfoComment>
            <InnerInfoCommentLink
              href="#"
              onClick={() => setShowReview(!showReview)}
            >
              {reviews.length}件の感想・評価
            </InnerInfoCommentLink>
          </InnerInfoComment>
        </InnerInfo>
      </InnerImage>
      <CSSTransition in={showReview} timeout={200} classNames="review">
        <Review>
          <ReviewList reviews={reviews} />
          <ReviewForm onSubmit={handleSubmit}>
            <ReviewFormInput
              rows={5}
              placeholder={`「${book.title}」を読んだ感想・評価を教えてください`}
              onChange={(event) => setComment(event.currentTarget.value)}
              value={comment}
            ></ReviewFormInput>
            <ReviewFormSubmit type="submit">投稿</ReviewFormSubmit>
          </ReviewForm>
        </Review>
      </CSSTransition>
    </Item>
  );
}

const List = styled.ul`
  padding: 0;
  list-style: none;
`;

export default function BookList({ books }: { books: Book[] }) {
  return (
    <List>
      {books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </List>
  );
}
