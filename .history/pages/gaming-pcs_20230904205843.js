import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { styled } from "styled-components";
import { Category } from "@/models/Category";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import PcProductGrid from "@/components/PcProductGrid";
import { useEffect, useState } from "react";
import axios from "axios";

const GamingPcs = ({
  childCategory,
  mainCategories, 
  productOfCategories, 
  wishedProduct}) => {

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  
  const products = Object.entries(productOfCategories);
  const p = products.pop()
  const product = p.pop()
  
  const pageSize = 10;
  
  function handlePrevious() {
    setPage((p) => {
      if (p < 0) return p;
      return p - 1;
    });
  }
 
  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }


 
  return (
    <>
      <Center>
        <CategoryTitle>
          <Title>
            {mainCategories[0].name}
          </Title>
        </CategoryTitle>
        <PcProductGrid 
        products={product} 
        wishedProduct={wishedProduct} 
        categories={mainCategories} 
        childCategory={childCategory} />
      </Center>
    </>
  );
};

export default GamingPcs;
export async function getServerSideProps(context) {
  await mongooseConnect();
  console.log(context.req)
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => c.name === 'Gaming PCs');
  const productOfCategories = {};
  const allFetchProductId = [];
  const childCategory = await Category.find({ parent: mainCategories[0]._id });
  
  for (let mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();

    // get or filter all child category object
    const categoriesHaveParent = categories.filter(
      (c) => c?.parent?.toString() === mainCatId
    );
 
    // get the id of child category
    
    const childIds = categoriesHaveParent.map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childIds];
    
    const products = await Product.find({ category: categoriesIds }, null, {
      sort: { _id: -1 },
    });
    allFetchProductId.push(...products.map(p => p._id.toString()))
    productOfCategories[mainCatId] = products;
  }

  const session = await getServerSession(context.req, context.res, authOptions)
  const wishedProduct = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: allFetchProductId,
  }) : [];
  return {
    props: {
 
      categories:JSON.parse(JSON.stringify(categories)),
      childCategory: JSON.parse(JSON.stringify(childCategory)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      productOfCategories: JSON.parse(JSON.stringify(productOfCategories)),
      wishedProduct: wishedProduct.map(i => i.product.toString())
    },
  };
}

const CategoryTitle = styled.div`
  margin-top: 40px;
  text-align: center;
  margin-bottom: 0;
  align-items: center;
`;
