import React from "react";
import Center from "./Center";
import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import Link from "next/link";
import {BsCartDash} from 'react-icons/bs';

const Background = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Titile = styled.h1`
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
`;

const ButtonLink = styled(Link)`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: white;
  background-color: ${primary};
`;

const ButtonStyle = styled.button`
  border: 1px solid ${primary};
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  color: white;
  background-color: transparent;
`;
const Featured = ({ product }) => {
  return (
    <Background>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Titile>{product.title}</Titile>
              <Desc>{product.description}</Desc>

              <ButtonWrapper>
                <ButtonStyle>
                  Read more
                  </ButtonStyle>
                  <ButtonLink href={"/products/" + product._id}><BsCartDash />Add to cart</ButtonLink>

              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt="" />
          </Column>
        </Wrapper>
      </Center>
    </Background>
  );
};

export default Featured;
