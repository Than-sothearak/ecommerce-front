import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import {RevealWrapper} from "next-reveal";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

import React from "react";
import { styled } from "styled-components";
import Link from "next/link";
import Title from "@/components/Title";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display:flex;
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a{
    color:#555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items:center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
  
`;

const categories = ({ mainCategories, categoriesProducts}) => {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map(cat => (
          <CategoryWrapper key={cat._id}>
            <CategoryTitle>
              <Title>{cat.name}</Title>
              <div>
                <Link href={'/category/'+cat._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {/* {categoriesProducts[cat._id].map((product,index) => (
                <RevealWrapper key={product._id} delay={index*50}>
                  <ProductBox {...product} />
                </RevealWrapper>
              ))} */}
              {/* <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                <ShowAllSquare href={'/category/'+cat._id}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper> */}
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
};

export default categories;

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  
  const categoriesProducts = {};
  for (let mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
 
  }
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
    },
  };
}
