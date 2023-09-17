import { grayBorder, primary } from "@/lib/colors";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import Textarea from "./Textarea";
import axios from "axios";
import Table from "./Table";

const ReviewProduct = ({ product, reviews }) => {
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const starCount = [1, 2, 3, 4, 5];

  function handleClick(starNumber) {
    setStars(starNumber);
  }

  function submitReview() {
    try {
      axios.post("/api/reviews", { description, stars, product: product._id });
      setStars(0);
      setDescription("");
      alert("Thank you for your reviewed");
    } catch (error) {
      console.error(error);
    }
  }
  const rating = reviews.map(review => {
     review.
     description
  })
  console.log(rating)
  return (
    <ProductReview>
      <OverallReview>
        <h1 className="text-3xl mt-10 text-center">
          Customer reviews & ratings
        </h1>
        <TotalReview>
          <h1 className="text-5xl font-bold mt-10 text-center text-gray-900">
          {reviews?.length} 
          </h1>
          <AllStar>
            {starCount.map((star, index) => (
              <button key={star}>
                <AiFillStar />
              </button>
            ))}
          </AllStar>
          <p>{reviews?.length} ratings</p>
        </TotalReview>

        <Table>
          <thead>
            <tr>
              <th>Showing review</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>
                  {starCount.map((star, index) => (
                    <button
                    disabled={true} 
                    key={star}>
                      {review.stars >= star ? <AiFillStar color='#fbc531'/> : <AiOutlineStar />}
                    </button>
                  ))}
                </td>
                <td>{review.createdAt}</td>
                <td>{review.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </OverallReview>
      <ReviewSubmit>
        <h1 className="text-3xl mt-10 text-center">Write your review</h1>
        <ReviewWrapper>
          <div>
            <h1>Overall Rating</h1>
          </div>
          <StarWrapper>
            {starCount.map((star, index) => (
              <button key={star} onClick={() => handleClick(star)}>
                {stars >= star ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            ))}
          </StarWrapper>
        </ReviewWrapper>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          role="textbox"
          placeholder="Your review"
        />

        <ButtonSubmit onClick={submitReview}>
          <button> Submit your review</button>
        </ButtonSubmit>
      </ReviewSubmit>
    </ProductReview>
  );
};

export default ReviewProduct;

const AllStar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: #808080;
  font-size: 18px;
`;
const TotalReview = styled.div`
  p {
    text-align: center;
    margin-top: 5px;
  }
`;
const ProductReview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;

const ReviewSubmit = styled.div`
  width: 100%;
`;

const OverallReview = styled.div``;
const ButtonSubmit = styled.div`
  margin: 20px auto;
  cursor: pointer;
  width: 100%;
  background-color: red;
  color: white;
  border-radius: 18px;
  padding: 5px;
  text-align: center;
`;

const ReviewWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  gap: 10px;
  justify-content: center;
`;

const StarWrapper = styled.div`
  display: flex;
  font-size: 34px;
  color: #fbc531;
`;
