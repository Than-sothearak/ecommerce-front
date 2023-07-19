import React from "react";
import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";

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
const Featured = ({product}) => {
  return (
    <Background>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Titile>{product.title}</Titile>
              <Desc>
                {product.description}
              </Desc>

              <ButtonWrapper>
                <ButtonLink white={1} outline={1} href={'/products/'+product._id}>
                  Read more
                </ButtonLink>
                <Button primary>
                 <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img
              src={product.images[0]}
              alt=""
            />
          </Column>
        </Wrapper>
      </Center>
    </Background>
  );
};

export default Featured;
