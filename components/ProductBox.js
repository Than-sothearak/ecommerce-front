import { styled } from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
width: 160px;
padding-top: 10px;
background-color: #fff;

box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;border-radius: 12px;

@media screen and (max-width: 280px) {
    width: 260px;
  }

  @media screen and (min-width: 640px) {
    width: 180px;
  }

  @media screen and (min-width: 768px) {
    width: 220px;
  }
  
  @media screen and (min-width: 1024px) {
    width: 290px;

  }
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 12px 0 0;
  margin-top: 1cap;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 140px;
  }

 
`;
const Title = styled.div`
  width: 100%;
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ProductInfoBox = styled.div`
    color: #2d3436;
  padding: 10px;

`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  
  align-items: center;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  @media screen and (max-width: 438px) {
    font-size: 1.5rem;
  }
`;

const TextBtn = styled.div`
font-size: 16px;
font-weight:400;

@media screen and (max-width: 1024px) {
   display: block;
   text-align: center;
   display: none;
    
  }
`
const ProductBox = ({ _id, title, description, price, images }) => {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <img src={images?.[0]} />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button onClick={() => addProduct(_id)}>
          <TextBtn type='button'>Add to cart</TextBtn>
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
