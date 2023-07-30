import React, { useContext } from "react";
import Center from "./Center";
import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import Link from "next/link";
import { BsCartDash } from "react-icons/bs";
import {CartContext} from "@/components/CartContext";

const Background = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 400px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;

  gap: 10px;
  padding-top: 10px;
  font-family: "Poppins", sans-serif;
`;

const ButtonStyle = styled.button`
  border: 0;
  padding: 15px 15px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 1px;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${primary};
`;

const ButtonLink = styled(Link)`
  border: 1px solid ${primary};
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: white;
  background-color: transparent;
  @media screen and (max-width: 678px) {
   font-size: 12px;
   padding: 0 10px;
   text-align: center;
   display: flex;
    
  }
`;

const TextBtn = styled.div`
font-size: 16px;

@media screen and (max-width: 678px) {
   display: block;
   text-align: center;
   display: none;
    
  }
`
const Featured = ({ product }) => {
  const {addProduct}= useContext(CartContext);
  function addToCart () {
    addProduct(product._id)
  }
  return (
    <Background>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>

              <ButtonWrapper>
                <ButtonLink href={"/product/"+product._id}>Read more
                </ButtonLink>
                <ButtonStyle onClick={addToCart}>
                <BsCartDash size={17} />
                  <TextBtn type='button'>Add to cart</TextBtn>
                </ButtonStyle>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]}/>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Background>
  );
};

export default Featured;
