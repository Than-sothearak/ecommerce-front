import React, { useContext } from "react";
import Center from "./Center";
import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import Link from "next/link";
import { CartContext } from "@/components/CartContext";
import Button from "./Button";
import { RevealWrapper } from "next-reveal";
import Image from "next/image"; // ✅ optimized images

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

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
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
  border-radius: 20px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  color: white;
  background-color: transparent;

  @media screen and (max-width: 678px) {
    font-size: 12px;
    padding: 6px 12px;
    text-align: center;
    display: flex;
  }
`;

const TextBtn = styled.div`
  font-size: 16px;
  font-weight: normal;

  @media screen and (max-width: 678px) {
    display: none;
  }
`;

const Featured = ({ products, featuredProductId }) => {
  const { addProduct } = useContext(CartContext);

  // ✅ safer lookup
  const featuredId =
    Array.isArray(featuredProductId) && featuredProductId.length > 0
      ? featuredProductId[0].value
      : null;

  const featuredProduct = products.find((p) => p._id === featuredId);

  const addToCart = () => {
    if (featuredProduct) {
      addProduct(featuredProduct._id, featuredProduct.title);
    }
  };

  return (
    <Background>
      <Center>
        {featuredProduct ? (
          <ColumnsWrapper>
            <Column>
              <div>
                <RevealWrapper delay={20} duration={3000}>
                  <Title>{featuredProduct.title}</Title>
                  <Desc>{featuredProduct.description}</Desc>
                </RevealWrapper>
                <RevealWrapper delay={80} duration={3000}>
                  <ButtonWrapper>
                    <ButtonLink href={`/store/${featuredProduct._id}`}>
                      Read more
                    </ButtonLink>
                    <Button onClick={addToCart}>
                      <TextBtn>Add to cart</TextBtn>
                    </Button>
                  </ButtonWrapper>
                </RevealWrapper>
              </div>
            </Column>
            <RevealWrapper delay={80} duration={3000}>
              <Column>
                {featuredProduct.images?.[0] ? (
                  <Image
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.title}
                    width={500}
                    height={340}
                    style={{ objectFit: "contain", margin: "0 auto" }}
                  />
                ) : (
                  <div>No image</div>
                )}
              </Column>
            </RevealWrapper>
          </ColumnsWrapper>
        ) : (
          <div>No featured product found</div>
        )}
      </Center>
    </Background>
  );
};

export default Featured;
