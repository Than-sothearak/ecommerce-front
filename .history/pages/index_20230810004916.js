import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import NewProduct from "@/components/NewProduct";
import FeaturedSlider from "@/components/FeaturedSlider";
import Footer from "@/components/Footer";
import { styled } from "styled-components";
import { Category } from "@/models/Category";
import HeaderNew from "@/components/HeaderNew";

const Container = styled.div`

`

export default function Home({ products, newProduct,categories }) {

  return (
    <Container>
      {/* <Header mainCategories={mainCategories}/> */}
      <HeaderNew 
      categories={categories} 
      />
      <FeaturedSlider />
      <Featured product={products} />
      <NewProduct newProduct={newProduct} />
      <Footer />
    </Container>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProduct = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const featuredProduct = await Product.find({}, null, {
    sort: { price: -1 },
    limit: 1,
  });
  const categories = await Category.find()
  const mainCategories = categories.filter(c => !c.parent)
  return {
    props: {
      products: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      categories: JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories))
    },
  };
}
