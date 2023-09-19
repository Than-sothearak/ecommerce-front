import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProduct from "@/components/NewProduct";
import { styled } from "styled-components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { Category } from "@/models/Category";
import { Setting } from "@/models/Setting";
import { Review } from "@/models/Review";

const Container = styled.div``;

export default function Home({
  products,
  featuredProductId,
  newProducts,
  wishedProduct,
  reviews
}) {
  console.log(reviews)
  return (
    <Container>
      <Featured featuredProductId={featuredProductId} products={products}/>
      <NewProduct 
        newProduct={newProducts} 
        wishedProduct={wishedProduct} 
        reviews={reviews}
      />
  
    </Container>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 9,
  });
  const reviews = await Review.find({product: newProducts.map(p => p._id)},)

  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const products = await Product.find();
  const featuredProductId = await Setting.find()
  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
      featuredProductId: JSON.parse(JSON.stringify(featuredProductId)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedProduct: wishedProduct.map((i) => i.product.toString()),
    },
  };
}
