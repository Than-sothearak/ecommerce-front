import React from 'react'
import Center from './Center'
import { styled } from 'styled-components'


const ImageContainer = styled.div`
width: 100%;
margin: 0 auto;
padding: 0;

`
const Images = styled.img`
width:100%;
height:auto;
`
const FeaturedSlider = () => {
  return (
    <>
    <Center>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </Center>
    </>
  )
}

export default FeaturedSlider