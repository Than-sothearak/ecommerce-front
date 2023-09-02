import { styled } from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import WishlistIcon from "./WishlisIcon";

const PcBox = ({
   _id, title, description, price, images, 
   wished=false
  }) => {
  const { addProduct } = useContext(CartContext);
  const [isWish, setIsWhish] = useState(wished);
  const {data: session} = useSession();
  const url = "/store/" + _id;
 
  function addWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      const nextValue = !isWish;
      try {
        axios.post('/api/wishlist', {
          product: _id
        }).then(() => {});
      } catch (err) {
      console.log(err)
      }
      setIsWhish(nextValue)
    } else {
      alert('You must login first')
    }
 
  }
  return (
    <>
      <ProductWrapper>
         <WishlistIcon addWishlist={addWishlist} wished={isWish}/>
        <WhiteBox href={url}>
          <img src={images?.[0]} />
          
        </WhiteBox>
        
        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
            <Price>${price}</Price>
            <Button onClick={() => addProduct(_id, title)}>
              <TextBtn type="button">Add to cart</TextBtn>
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    </>
  );
};

export default PcBox;


const ProductWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const WhiteBox = styled(Link)`
  background-color: white;
  height: 240px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 12px 0 0;
  padding: 0;

  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 200px;
  }
`;
const Title = styled.div`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  white-space: nowrap; 
  width: 240px; 
  text-overflow: ellipsis; 
  overflow: hidden;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  @media screen and (max-width: 868px) {
    width: 200px; 
  }
`;
const ProductInfoBox = styled.div`
  color: #2d3436;
  padding: px;
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
  font-weight: 400;

  @media screen and (max-width: 1024px) {
    display: block;
    text-align: center;
    display: none;
  }
`;


