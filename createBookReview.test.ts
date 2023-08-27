import $ from "jquery";
import createBookReview from "./createBookReview";
import { Review } from "./types/Review";

describe("createBookReview()", () => {
  const review: Review = {
    id: 1,
    username: "テストユーザー",
    comment: "面白い本でした",
    like: 3,
  };

  test("should return DOM element", () => {
    document.body.innerHTML = `<ul>${createBookReview(review)}</ul>`;
    expect($(".review__list__item").length).toBe(1);
  });

  test("should match comment", () => {
    document.body.innerHTML = `<ul>${createBookReview(review)}</ul>`;
    expect($(".review__list__item__comment").text()).toBe(
      `${review.username}さんの感想・評価`
    );
  });

  test("should match like count", () => {
    document.body.innerHTML = `<ul>${createBookReview(review)}</ul>`;
    expect($(".review__list__item__like__button").text()).toBe(
      `❤️ ${review.like}件`
    );
  });
});
