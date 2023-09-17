import { primary } from "@/lib/colors";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import Textarea from "./Textarea";
import axios from "axios";

const Review = () => {
const [stars, setStars] = useState(0)
const [description, setDescription] = useState('')
const starCount = [1,2,3,4,5]


function handleClick (starNumber) {
    setStars(starNumber)
   
}

function submitReview () {
 axios.post('/api/review',{description, stars, product:product._id})
 alert('Thank you for your reviewed')
}


  return ( 
    <div>
      <h1 className="text-3xl mt-10 text-center">Write your review</h1>
      <ReviewWrapper>
        <div>
          <h1>Overall Rating</h1>
        </div>
        <StarWrapper>
            {starCount.map((star, index) => (
             <button 
             key={star}
             onClick={() => handleClick(star)}>
                {stars >= star? <AiFillStar /> : <AiOutlineStar />}
                </button>

            ))}
        </StarWrapper>
      </ReviewWrapper>
      <Textarea 
      onChange={e => setDescription(e.target.value)}
      value={description}
      role="textbox" 
      placeholder="Your review" />

    
      <ButtonSubmit onClick={submitReview}>
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
