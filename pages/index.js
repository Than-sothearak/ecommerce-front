import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import NewProduct from "@/components/NewProduct";
import { styled } from "styled-components";
import { Category } from "@/models/Category";


const Container = styled.div`

`

export default function Home({ products, newProduct,categories }) {

  return (
    <Container>
      {/* <FeaturedSlider /> */}
      <Featured product={products} />
      <NewProduct newProduct={newProduct} />
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
