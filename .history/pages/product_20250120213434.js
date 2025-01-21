import Center from "@/components/Center";
import HeaderNew from "@/components/DropdownMenu";
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

export default function ProductsPage({ allProducts, wishedProduct }) {
  return (
    <>
    
      <Center>
        <CategoryTitle>
          <Title>All Products</Title>
        </CategoryTitle>
        <ProductGrid products={allProducts} wishedProduct={wishedProduct}/>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find();
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(context.req, context.res, authOptions)
  const wishedProduct = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: allProducts.map(p => p._id.toString()),
  }) : [];

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
      wishedProduct: wishedProduct.map(i => i.product.toString())
    },
  };
}
