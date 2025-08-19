import { styled } from "styled-components";
import Link from "next/link";
import Image from "next/image";  // ✅ Next.js optimized image
import Button from "./Button";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import WishlistIcon from "./WishlisIcon";

const ProductWrapper = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
    rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 12px;
  overflow: hidden;
`;

const WhiteBox = styled(Link)`
  background-color: white;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 12px 0 0;
  cursor: pointer;
  position: relative; /* ✅ needed for next/image layout */
`;

const Title = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  width: 240px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.9rem;
  display: block;
  margin: 0;

  @media screen and (max-width: 868px) {
    width: 200px;
  }
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
  font-size: 1.2rem;
  font-weight: bold;

  @media screen and (max-width: 438px) {
    font-size: 1rem;
  }
`;

const TextBtn = styled.div`
  font-size: 14px;
  font-weight: 400;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div`
  background-color: black;
  padding: 10px;
`;

const ProductBox = ({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
}) => {
  const { addProduct } = useContext(CartContext);
  const [isWish, setIsWish] = useState(wished);
  const { data: session } = useSession();
  const url = "/store/" + _id;

  async function addWishlist(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("You must login first");
      return;
    }

    try {
      await axios.post("/api/wishlist", { product: _id });
      setIsWish(!isWish);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <ProductWrapper>
        <WishlistIcon addWishlist={addWishlist} wished={isWish} />

        <WhiteBox href={url}>
          <Image
            src={images?.[0] || "/placeholder.png"} // ✅ fallback
            alt={title}
            width={200}   // ✅ control sizes
            height={160}
            style={{ objectFit: "contain" }}
          />
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
    </Container>
  );
};

export default ProductBox;
