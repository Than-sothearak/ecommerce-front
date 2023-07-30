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
height:auto;
`
const FeaturedSlider = () => {
  return (
    <>
    <Center>
        <ImageContainer>
        <Images src='https://dlcdnwebimgs.asus.com/gain/21AE219C-6E24-4FD8-B83D-EFC9E131B315/fwebp'/>

        </ImageContainer>
       
    </Center>
    </>
  )
}

export default FeaturedSlider