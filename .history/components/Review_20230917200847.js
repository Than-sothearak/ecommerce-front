import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Review = () => {
  return (
    <div>
    <h1 className="text-3xl mt-2 text-center">Write your review</h1>
     <div>
        <h1>Overall Rating</h1>
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
     </div>
  </div>
  )
}

export default Review