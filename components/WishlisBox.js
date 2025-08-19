import { styled } from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import WishlistIcon from "./WishlisIcon";
import Image from "next/image"; // ✅ Next.js optimized image

const ProductWrapper = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 12px;
  overflow: hidden;
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
    object-fit: contain;
  }
`;

const Title = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  display: block;
  margin-bottom: 6px;
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
  font-size: 1.6rem;
  font-weight: bold;
  @media screen and (max-width: 438px) {
    font-size: 1.2rem;
  }
`;

const WishlistBox = ({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
}) => {
  const { addProduct } = useContext(CartContext);
  const [isWish, setIsWish] = useState(wished);
  const url = "/product/" + _id;
  const { data: session } = useSession();

  async function addWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      const nextValue = !isWish;
      try {
        await axios.post("/api/wishlist", {
          product: _id,
        });
        setIsWish(nextValue);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You must login first");
    }
  }

  return (
    <ProductWrapper>
      {/* Heart / Wishlist icon */}
      <WishlistIcon addWishlist={addWishlist} wished={isWish} />

      <WhiteBox href={url}>
        {images?.[0] ? (
          <Image
            src={images[0]}
            alt={title}
            width={200}
            height={140}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Image
            src="/placeholder.png"
            alt="No image"
            width={200}
            height={140}
            style={{ objectFit: "contain" }}
          />
        )}
      </WhiteBox>

      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button onClick={() => addProduct(_id, title)}>Add to cart</Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default WishlistBox;
