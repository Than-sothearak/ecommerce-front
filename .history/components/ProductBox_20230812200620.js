import { styled } from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const ProductWrapper = styled.div`
width: 100%;
box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 12px 0 0;

  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 140px;
  }

 
`;
const Title = styled.div`
  
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;

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

const Icon = styled.div`
  position: absolute;
  float: right;
`

const ProductBox = ({ _id, title, description, price, images }) => {
  const {addProduct} = useContext(CartContext);
  const [whislist, setWhislis] = useState(false);
  const url = '/product/'+_id;

  function addWhislist (e) {
    e.preventDefault()
    setWhislis(true);
  }
  
  return (
    <>
    <ProductWrapper>
    <Icon>
          <AiOutlineHeart size={28}/>
        </Icon>
      <WhiteBox href={url}>
        <img src={images?.[0]} />
        
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button onClick={() => addProduct(_id, title)}>
          <TextBtn type='button'>Add to cart</TextBtn>
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
    </>
  );
};

export default ProductBox;
