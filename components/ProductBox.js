import { styled } from "styled-components";
import Button from "./Button";

const ProductWrapper = styled.div``;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 130px;
  }
`;
const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const ProductBox = ({ _id, title, description, price, images }) => {
  return (
    <ProductWrapper>
      <WhiteBox>
        <img src={images[0]} />
      </WhiteBox>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary>Add to cart</Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
