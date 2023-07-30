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
  width: 278px;
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 748px) {
    width: 150px;
    
  }
 
  
  @media screen and (max-width: 978px) {
    width: 208px;
  }
  
`;
const ProductInfoBox = styled.div`
  margin-top: 12px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const ButtonStyle = styled.button`
  border: 1px solid ${primary};
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  color: ${primary};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
`;
const ProductBox = ({ _id, title, description, price, images }) => {
  const url = '/product/'+_id; 
  const {addProduct} = useContext(CartContext);

  
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <img src={images?.[0]} />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <ButtonStyle onClick={() => addProduct(_id)}>
            Add to cart
          </ButtonStyle>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
