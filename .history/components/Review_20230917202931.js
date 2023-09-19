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
      <ReviewWrite 
      
      role="textbox" 
      placeholder="Your review"></ReviewWrite>
       <ButtonSubmit>
          Submit your review
        </ButtonSubmit>
    </div>
   
  );
};

export default Review;

const ButtonSubmit = styled.button`
  margin: 0 auto;
  width: 100%;
`
const ReviewWrite = styled.input`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
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
`;
