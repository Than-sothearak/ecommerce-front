import React from 'react'
import Center from './Center'
import { styled } from 'styled-components'

const Images = styled.img`
width:100%;`
const FeaturedSlider = () => {
  return (
    <>
    <Center>
        <img src='https://img.freepik.com/premium-photo/blue-starry-sky-generative-ai_791316-12386.jpg?w=2000'/>
    </Center>
    </>
  )
}

export default FeaturedSlider