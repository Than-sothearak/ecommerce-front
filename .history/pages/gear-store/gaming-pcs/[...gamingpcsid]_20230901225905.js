import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { AiOutlineHeart } from "react-icons/ai";
import { LiaWarehouseSolid } from "react-icons/lia";
import { AiFillGift } from "react-icons/ai";
import Link from "next/link";
import { Category } from "../../../models/Category"
import HeaderNew from "@/components/Navbar";
import { getServerSession } from "next-auth";
import axios from "axios";
import WishlistIcon from "@/components/WishlisIcon";
import { useSession } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { Product } from "@/models/Products";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

const ListItems = styled.li`
  font-size: 14px;
`;
const Container = styled.div`
  font-family: "Open Sans", sans-serif;
`;
const ProductDetial = styled.div`
  color: #474746;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const Hr = styled.div`
  margin: 20px 0;
  width: 100%;
`;
const LinkText = styled(Link)`
  text-decoration-line: underline;
`;
const AddToList = styled.div`
  width: 50%;
  text-align: center;
  border-color: #f1f1f2;
  text-align: center;
  border-right-style: solid;
  border-right-width: 1px;
  @media screen and (min-width: 768px) {
    flex: 0.5;
  }

`;
const QuickProductDetial = styled.div`
  width: 100%;
  list-style-type: none;
  color: #474746;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    @media screen and (min-width: 768px) {
      width: 50%;
  }
`;
export default function SingleProductPage({ product,categories, wishedProduct}) {
  
  const wished = wishedProduct[0]?.product.includes(product._id)

  const [isWish, setIsWhish] = useState(wished);
  const { addProduct } = useContext(CartContext);
  const { data: session } = useSession();

  function addWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (session) {
      const nextValue = !isWish;
      try {
        axios.post('/api/wishlist', {
          product: product._id
        }).then(() => {});
      } catch (err) {
      console.log(err)
      }
      setIsWhish(nextValue)
    } else {
      alert('You must login first')
    }
  }

  const productProperty = Object.entries(product.properties);
  const listItems = productProperty.map((data, index) => (
    <ListItems key={index}>
        <ul className="flex">
          <li className="w-36"> <strong> {data[0]}</strong></li>
          <li className="w-80 text-start"><span> {data[1]}</span></li>
        </ul>
        
    </ListItems>
  ));
  
  return (
    <>
      <HeaderNew categories={categories}/>
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <Container>
            <ProductDetial>
             <WishlistIcon wished={isWish} addWishlist={addWishlist}/>
              <Title>{product.title}</Title>
              <p className="mt-5">{product.description}</p>
              <Hr>
                <hr></hr>
              </Hr>
              <div className="flex gap-2 items-center ">
                <LiaWarehouseSolid size={22} />
                <p>Currently out of stock</p>
              </div>
              <Hr>
                <hr></hr>
              </Hr>
              <div className="flex justify-center my-5">
                <AddToList className="flex items-center gap-5">
                  <AiOutlineHeart size={22} />
                  <LinkText href={"/"}>Add to list</LinkText>
                </AddToList>
                <div className="flex items-center gap-5">
                  <AiFillGift size={22} />
                  <LinkText href={"/"}>Add to registry</LinkText>
                </div>
              </div>
              <PriceRow>
                <div>
                  <Price>${product.price}</Price>
                </div>
                <div>
                  <Button primary onClick={() => addProduct(product._id, product.title)}>
                    Add to cart
                  </Button>
                </div>
              </PriceRow>
            </ProductDetial>
          </Container>
        </ColWrapper>
        <div>
        <h1 className="text-2xl mb-2">
        Quick highlights
        </h1>
        <QuickProductDetial>
          <div className="inline-grid grid-cols-2 gap-4 sm:grid-cols-2">
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
        </QuickProductDetial>
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find();
  const product = await Product.findById(context.query.id)
  console.log(context.query.id)
  const session = await getServerSession(context.req, context.res, authOptions)
  const wishedProduct = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: '21212121'
  }) : [];
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categories: JSON.parse(JSON.stringify(categories)),
      wishedProduct: JSON.parse(JSON.stringify(wishedProduct))
    },
  };
}
