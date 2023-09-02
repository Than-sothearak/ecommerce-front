import Center from "@/components/Center";
import HeaderNew from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { styled } from "styled-components";
import { Category } from "@/models/Category";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";

const CategoryTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
`;

const GamingPcs = () => {
  return (
   <>
   <Center>
        <CategoryTitle>
          <Title>All Products</Title>
        </CategoryTitle>
        <ProductGrid products={allProducts} wishedProduct={wishedProduct}/>
      </Center>
   </>
  )
}

export default GamingPcs