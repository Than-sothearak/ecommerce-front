import { primary } from "@/lib/colors";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Review = () => {
const [starCount, setStarCount] = useState(2)
const stars = [1,2,3,4,5]
function handleClick (starNumber) {
    setStarCount(starNumber)
}
alert(setStarCount)
  return (
    <div>
      <h1 className="text-3xl mt-10 text-center">Write your review</h1>
      <ReviewWrapper>
        <div>
          <h1>Overall Rating</h1>
        </div>
        <StarWrapper>
            {stars.map((star, index) => (
             <button 
             key={star}
             onClick={() => handleClick(star)}>
                {starCount > star? <AiFillStar /> : <AiOutlineStar />}
                </button>

            ))}
        </StarWrapper>
      </ReviewWrapper>
      <ReviewWrite role="textbox" placeholder="Your review"></ReviewWrite>
      <ButtonSubmit>
        <button> Submit your review</button>
      </ButtonSubmit>
    </div>
  );
};

export default Review;

const ButtonSubmit = styled.div`
  margin: 20px auto;
  cursor: pointer;
  width: 100%;
  background-color: red;
  color: white;
  border-radius: 18px;
  padding: 5px;
  text-align: center;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;
const ReviewWrite = styled.input`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 7px;
  display: block;
  overflow: hidden;
  resize: both;
  min-height: 40px;
  line-height: 20px;
  &:focus {
    outline: none;
  }
  @media screen and (min-width: 768px) {
    width: 50%;
  }
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
  color: ${primary};
`;
