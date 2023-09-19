import { StarIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styled from 'styled-components'

const Review = () => {
  return (
    <div>
    <h1 className="text-3xl mt-2 text-center">Write your review</h1>
     <StarIcon>
        <h1>Overall Rating</h1>
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
     </StarIcon>
  </div>
  )
}

export default Review

const StarIcon = styled.button`

`