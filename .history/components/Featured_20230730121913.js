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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
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
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
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
  @media screen and (max-width: 640px) {
   font-size: 10px;
   padding: 0 2px;
   align-items: center;
    
  }
`;
const Featured = ({ product }) => {
  const {addProduct}= useContext(CartContext);
  function addToCart () {
    addProduct(product._id)
  }
  return (
    <Background>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>

              <ButtonWrapper>
                <ButtonLink href={"/products/"+product._id}>Read more
                </ButtonLink>
                <ButtonStyle onClick={addToCart}>
                <BsCartDash size={17} />
                  <div type='button'>Add to cart</div>
                </ButtonStyle>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]}/>
          </Column>
        </Wrapper>
      </Center>
    </Background>
  );
};

export default Featured;
