import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import NewProduct from "@/components/NewProduct";
import { styled } from "styled-components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

const Container = styled.div`

`

export default function Home({ products, newProducts, wishedProduct}) {

  return (
    <Container>
      {/* <FeaturedSlider /> */}
      <Featured product={products} />
      <NewProduct newProduct={newProducts} wishedProduct={wishedProduct} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const featuredProduct = await Product.find({}, null, {
    sort: { price: -1 },
    limit: 1,
  });
  const session = await getServerSession(context.req, context.res, authOptions)
  const wishedProduct = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: newProducts.map(p => p._id.toString()),
  }) : [];

  return {
    props: {
      products: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedProduct: wishedProduct.map(i => i.product.toString()),
    },
  };
}
