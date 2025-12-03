import { styled } from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import WishlistIcon from "./WishlisIcon";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { grayBorder } from "@/lib/colors";
import Image from "next/image";

const PcBox = ({
  _id,
  title,
  price,
  images,
  properties,
  wished = false,
  reviews,
}) => {
  const { addProduct } = useContext(CartContext);
  const [isWish, setIsWhish] = useState(wished);
  const { data: session } = useSession();
  const starCount = [1, 2, 3, 4, 5];
  const url = "/store/" + _id;
  function addWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      const nextValue = !isWish;
      try {
        axios
          .post("/api/wishlist", {
            product: _id,
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
  
 

  
  const productProperty = Object?.entries(properties);
  const listItems = productProperty?.map((data, index) => (
    <ListItems key={index}>
        
          <li><span> {data[1].replace(/\s*\(.*?\)\s*/g, '')}</span></li>
     
    </ListItems>
  ));

  listItems.splice(7)
  
  const rating = reviews?.filter(p => p.product === _id)
  const totalRating = 
  rating?.map(r => r.stars).reduce(function(acc, val) { return acc + val; }, 0)
  // 
  const totalRaingStar = totalRating / rating?.length

  console.log(listItems)
 
  return (
  
      <ProductWrapper>
       <ImageBox>
       <WishlistIcon addWishlist={addWishlist} wished={isWish} />
        <WhiteBox href={url}>
          <Image
            src={images?.[0] || "/placeholder.png"}
            alt={title}
            width={240}
            height={200}
            style={{
              objectFit: "contain",
              maxHeight: "200px",
              width: "auto",
            }}
            priority={false}
          />
        </WhiteBox>
       </ImageBox>

        <ProductInfoBox>
          <div>
          <Title href={url}>{title}</Title>
          <ReviewWrapper>
            <StarIcon>
            {starCount.map((star, index) => (
              <button key={star}>
             {totalRaingStar >= star ? <AiFillStar color='#fbc531'/> : <AiOutlineStar />}

              </button>
            ))}
            </StarIcon>
            <div>{`(${rating?.length})`}</div>
          </ReviewWrapper>
          </div>
       
          {listItems.filter(item => {
             if (item) {
              return item;
             }
          })}
    
        </ProductInfoBox>
        <PriceRow>
          <Pricetag>
            <h5>SAVE $100</h5>
          </Pricetag>
          <Price>
            <h1> ${USDollar.format(parseInt(price))}</h1>
            <h5>${USDollar.format(parseInt(price) + 100)}</h5>
          </Price>
          <FooterButton>
            <ShipingText>
            <h4>Free Shipping</h4>
            <h5>Estimate Ship By 09/11/2023</h5>
            </ShipingText>
            <Button onClick={() => addProduct(_id, title)}>
              <TextBtn type="button">Add to cart</TextBtn>
            </Button>
          </FooterButton>
        </PriceRow>
      </ProductWrapper>
  
  );
};

export default PcBox;

const ImageBox = styled.div`
display: flex;
flex-direction: column;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 170px;   /* prevent shrinking smaller than 170px */
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0,0,0,0.12) 0px 1px 3px,
              rgba(0,0,0,0.24) 0px 1px 2px;
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
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;

`;
const DescriptionWrapper = styled.p`
width: 100%;

`;
const ProductInfoBox = styled.div`
height: 100%;
display: flex;
flex-direction: column;

  color: #2d3436;
  padding: 0px 20px;
`;

const PriceRow = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
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
    border-radius: 10px;
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
  flex-wrap: wrap;
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
list-style-type: disc;
  padding-left: 20px;
  font-size: 12px;
  margin-top: 5px;
  overflow: hidden;
  width: 100%;         /* ⭐ responsive */
  text-overflow: ellipsis;
 
`;

 