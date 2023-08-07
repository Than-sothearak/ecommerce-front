import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { styled } from "styled-components";

const CategoryTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
`;

export default function ProductsPage({ allProducts }) {
  return (
    <>
      <Header />
      <Center>
        <CategoryTitle>
          <Title>All Products</Title>
        </CategoryTitle>
        <ProductGrid products={allProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}
