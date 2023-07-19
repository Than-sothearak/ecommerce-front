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

const ButtonLink = styled(Link)`
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

const ButtonStyle = styled.button`
  border: 1px solid ${primary};
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;

  color: white;
  background-color: transparent;
`;
const Featured = ({ product }) => {
  const {setCartProducts}= useContext(CartContext);
  function addToCart () {
    setCartProducts(prev =>[...prev, product._id] )
  }
  return (
    <Background>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <h1>{product.title}</h1>
              <p>{product.description}</p>

              <ButtonWrapper>
                <ButtonStyle>Read more</ButtonStyle>
                <ButtonLink href={"/products/"+product._id} onClick={addToCart}>
                  <BsCartDash size={17} />
                  <div>Add to cart</div>
                </ButtonLink>
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
