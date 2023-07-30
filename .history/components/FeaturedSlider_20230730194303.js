import React from 'react'
import Center from './Center'
import { styled } from 'styled-components'


const ImageContainer = styled.div`
width: 100%;
height: 480px;
margin: 0 auto;

`
const Images = styled.img`
width:100%;
height:480px;
`
const FeaturedSlider = () => {
  return (
    <>
    <Center>
        <ImageContainer>
        <Images src='https://img.freepik.com/premium-photo/blue-starry-sky-generative-ai_791316-12386.jpg?w=2000'/>

        </ImageContainer>
       
    </Center>
    </>
  )
}

export default FeaturedSlider