import React from "react";
import { styled } from "styled-components";

const ImageWrapper = styled.div`
  width:  100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;
const Img = styled.img`
  width: 100%;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (min-width: 768px) {
  width: 100%;
  height: 300px;
  background-size: cover;
  }
  @media screen and (min-width: 1280px) {
  width: 100%;
  height: 540px;
  background-size: cover;   
  } 
  @media screen and (min-width: 1480px) {
  width: 100%;
  height: 620px;
  background-size: contain;   
  } 
`;

const FeaturedSlider = () => {
  const slide = [
    {
      url: "https://dlcdnwebimgs.asus.com/gain/21AE219C-6E24-4FD8-B83D-EFC9E131B315/fwebp",
    },

    {
      url: "https://media.suara.com/pictures/653x366/2021/01/13/35619-asus-rog-ces-2021.jpg",
    },

    {
      url: "https://rog.asus.com/event/id/ROGIntel12thGen/img/dekstop-banner.jpg",
    },
  ];
  return (
    <>
      <ImageWrapper>
        <Img style={{ backgroundImage: `url(${slide[0].url})` }}></Img>
      </ImageWrapper>
    </>
  );
};

export default FeaturedSlider;
