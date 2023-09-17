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
     return review.stars
  })

const findFiveStars = rating.filter(rating => {
  return rating === 5
}).length
const findFourStars = rating.filter(rating => {
  return rating === 4
}).length

const findTreeStars = rating.filter(rating => {
  return rating === 3
}).length

const findTowStars = rating.filter(rating => {
  return rating === 2
}).length

const findOneStars = rating.filter(rating => {
  return rating === 1
}).length

 const totalRating = 
       rating.reduce(function(acc, val) { return acc + val; }, 0)

 const totalRaingStar = totalRating / reviews.length

 const getLimitReviews = reviews.slice(0, 4)

  return (
    <ProductReview>
      <OverallReview>
        <h1 className="text-3xl mt-10 text-center">
          Customer reviews & ratings
        </h1>
        <TotalReview>
          <h1 className="text-5xl font-bold mt-10 text-center text-gray-900">
          {totalRaingStar.toFixed(1)} 
          </h1>
          <AllStar>
            {starCount.map((star, index) => (
              <button key={star}>
            {totalRaingStar >= star ? <AiFillStar color='#fbc531'/> : <AiOutlineStar />}

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
            {getLimitReviews.map((review) => (
              <tr key={review._id}>
                <td>
                  <div className="flex justify-between ">
                  <div className="text-lg">
                  {starCount.map((star, index) => (
                    <button
                    disabled={true} 
                    key={star}>
                      {review.stars >= star ? <AiFillStar color='#2f3640'/> : <AiOutlineStar />}
                    </button>
                  ))}
                  </div>
                    <h1 className="text-md text-gray-400 font-bold">{(new Date(review.createdAt).toLocaleString('sv-SE'))}</h1>

                  </div>
                  <p className="mt-2">{review.description}</p>
                </td>
               
                
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
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
   @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
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
