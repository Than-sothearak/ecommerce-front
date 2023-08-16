import React, { useContext } from "react";
import Center from "./Center";
import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import Link from "next/link";
import { CartContext } from "@/components/CartContext";
import Button from "./Button";
import { RevealWrapper } from "next-reveal";
import { RevealList } from "next-reveal";

const Background = styled.div`
  background-color: #222;
  color: #0984e3;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 2rem;
`;
const Desc = styled.p`
  margin-top: 10px;
  color: #aaa;
  font-size: 1rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 340px;
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
    img {
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
  font-weight: normal;

  @media screen and (max-width: 678px) {
    display: block;
    text-align: center;
    display: none;
  }
`;
const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  const featuredProduct = product[0];
  function addToCart() {
    addProduct(featuredProduct._id, featuredProduct.title);
  }
  return (
    <Background>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper delay={20}>
                <Title>{featuredProduct.title}</Title>
                <Desc>{featuredProduct.description}</Desc>
              </RevealWrapper>
              <RevealWrapper delay={80}>
                <ButtonWrapper>
                  <ButtonLink href={"/product/" + featuredProduct._id}>
                    Read more
                  </ButtonLink>
                  <Button onClick={addToCart}>
                    <TextBtn type="button">Add to cart</TextBtn>
                  </Button>
                </ButtonWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <RevealWrapper interval={60} delay={100}>
            <Column>
              <img src={featuredProduct.images?.[0]} />
            </Column>
          </RevealWrapper>
        </ColumnsWrapper>
      </Center>
    </Background>
  );
};

export default Featured;
