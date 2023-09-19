import { primary } from "@/lib/colors";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
import Textarea from "./Textarea";
import axios from "axios";

const Review = ({product}) => {
const [stars, setStars] = useState(0)
const [description, setDescription] = useState('')
const starCount = [1,2,3,4,5]


function handleClick (starNumber) {
    setStars(starNumber)
   
}

function submitReview () {
 try {
    axios.post('/api/reviews',{description, stars, product:product._id})
    setStars(0)
    setDescription('')
    alert('Thank you for your reviewed')
 } catch (error){
    console.error(error);
 }
}


  return ( 
    <ProductReview>
      <ReviewSubmit>
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
      </ReviewSubmit>
      <OverallReview>
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
      </OverallReview>
    </ProductReview>
  );
};

export default Review;
const ProductReview = styled.div`
display: flex;

`

const ReviewSubmit =styled.div`

`

const OverallReview = styled.div`

`
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
