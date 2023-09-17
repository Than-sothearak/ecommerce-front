import { StarIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styled from 'styled-components'

const Review = () => {
  return (
    <div>
    <h1 className="text-3xl mt-2 text-center">Write your review</h1>
     <ReviewWrapper>
        <h1>Overall Rating</h1>
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
     </ReviewWrapper>
  </div>
  )
}


export default Review;

const  ReviewWrapper = styled.button`
   display: flex;
   justify-content: space-around;
`