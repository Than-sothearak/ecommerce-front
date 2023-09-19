import { primary } from "@/lib/colors";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Review = () => {
  return (
    <div>
      <h1 className="text-3xl mt-10 text-center">Write your review</h1>
      <ReviewWrapper>
        <div>
          <h1>Overall Rating</h1>
        </div>
        <StarWrapper>
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </StarWrapper>
      </ReviewWrapper>
      <ReviewWrite>
          
      </ReviewWrite>
    </div>
  );
};

export default Review;
const ReviewWrite = styled.input`
width: 100%;
padding: 10px;
`
const ReviewWrapper = styled.button`
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
`
