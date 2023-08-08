import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import NewProduct from "@/components/NewProduct";
import FeaturedSlider from "@/components/FeaturedSlider";
import Footer from "@/components/Footer";
import { styled } from "styled-components";

const Container = styled.div`

`

export default function Home({ product, newProduct }) {
  return (
    <Container>
      <Header />
      <FeaturedSlider />
      <Featured product={product} />
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
  console.log(featuredProduct)
  return {
    props: {
      product: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
