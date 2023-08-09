import Center from "@/components/Center";
import Footer from "@/components/Footer";
import HeaderNew from "@/components/HeaderNew";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { styled } from "styled-components";
import { Category } from "@/models/Category";

const CategoryTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
`;

export default function ProductsPage({ allProducts, categories }) {
  return (
    <>
      <HeaderNew  categories={categories}  />
      <Center>
        <CategoryTitle>
          <Title>All Products</Title>
        </CategoryTitle>
        <ProductGrid products={allProducts} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find()
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
