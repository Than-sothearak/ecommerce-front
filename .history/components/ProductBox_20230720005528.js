import { styled } from "styled-components";
import Link from "next/link";
import { primary } from "@/lib/colors";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 140px;
  }
`;
const Title = styled.div`
  width: 200px;
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
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  align-items: center;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
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
const ProductBox = ({ _id, title, description, price, images }) => {
  const url = '/product/'+_id; 
  const {addProductToCart} = useContext(CartContext);
  function addToCart() {
    addProductToCart(_id)
  }
  
  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <img src={images[0]} />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <ButtonStyle onClick={addToCart}>
            Add to cart
          </ButtonStyle>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
