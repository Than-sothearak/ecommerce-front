import { styled } from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WishlistIcon from "./WishlisIcon";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { grayBorder } from "@/lib/colors";

const PcBox = ({
  products,
  wished = false,
}) => {
  const { addProduct } = useContext(CartContext);
  const [isWish, setIsWhish] = useState(wished);
  const { data: session } = useSession();
  const url = "/store/" + products._id;

  function addWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      const nextValue = !isWish;
      try {
        axios
          .post("/api/wishlist", {
            product: products_id,
          })
          .then(() => {});
      } catch (err) {
        console.log(err);
      }
      setIsWhish(nextValue);
    } else {
      alert("You must login first");
    }
  }
  let USDollar = new Intl.NumberFormat();

  const productProperty = Object.entries(products.properties);
  const listItems = productProperty.map((data, index) => (
    <ListItems key={index}>
        
          <li><span> {data[1].replace(/\s*\(.*?\)\s*/g, '')}</span></li>
     
    </ListItems>
  ));

  listItems.splice(7)
 
  return (
    <>
      <ProductWrapper>
        <WishlistIcon addWishlist={addWishlist} wished={isWish} />
        <WhiteBox href={url}>
          <img src={products.images?.[0]} />
        </WhiteBox>

        <ProductInfoBox>
          <Title href={url}>{products.title}</Title>
          <ReviewWrapper>
            <StarIcon>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </StarIcon>
            <div>{`(13)`}</div>
          </ReviewWrapper>
          <DescriptionWrapper>
          <div>
          {listItems.filter(item => {
             if (item) {
              return (
                <div>
                 {item}
                </div>
              )
             }
          })}
          </div>
          </DescriptionWrapper>
        </ProductInfoBox>
        <PriceRow>
          <Pricetag>
            <h5>SAVE $100</h5>
          </Pricetag>
          <Price>
            <h1> ${USDollar.format(parseInt(products.price))}</h1>
            <h5>${USDollar.format(parseInt(products.price) + 100)}</h5>
          </Price>
          <FooterButton>
            <ShipingText>
            <h4>Free Shipping</h4>
            <h5>Estimate Ship By 09/11/2023</h5>
            </ShipingText>
            <Button onClick={() => addProduct(products._id, products.title)}>
              <TextBtn type="button">Add to cart</TextBtn>
            </Button>
          </FooterButton>
        </PriceRow>
      </ProductWrapper>
    </>
  );
};

export default PcBox;

const ProductWrapper = styled.div`
  margin-top: 20px;
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
const DescriptionWrapper = styled.div`

`;
const ProductInfoBox = styled.div`
  color: #2d3436;
  padding: 0px 20px;
`;

const PriceRow = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f1f2f6;
  justify-content: space-between;
  align-items: center;
`;
const Pricetag = styled.div`
  display: flex;

  h5 {
    font-size: 14px;
    font-weight: 400;
    background-color: #ff3838;
    margin: 10px 0;
    padding: 2px 10px;
    color: white;
    border-radius: 15px;
  }
`;
const Price = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  h1 {
    font-size: 1.3rem;
    font-weight: bold;
  }
  h5 {
    font-size: 14px;
    font-weight: 300;
    color: ${grayBorder};
    text-decoration-line: line-through;
  }
  @media screen and (max-width: 438px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const TextBtn = styled.div`
  font-size: 14px;
  font-weight: 400;


`;

const ReviewWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-items: center;
  gap: 10px;
`;
const StarIcon = styled.div`
  display: flex;
  justify-items: center;
  margin-top: 4px;
  gap: 2px;
  color: #ffc300;
`;
const FooterButton = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 5px;
  justify-content: space-between;`;
const ShipingText = styled.div`
h4 {
  font-size: small;
  font-weight: bold;
}
h5 {
  font-size: 10px;
}
`
const ListItems = styled.ul`
list-style-type: none;
font-size: small;
margin-top: 5px;
overflow:hidden;
 width:280px;
  text-overflow: ellipsis;
  white-space: nowrap;

`;