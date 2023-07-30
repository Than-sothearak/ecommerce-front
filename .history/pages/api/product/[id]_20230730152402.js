import Center from "@/components/Center";
import Header from "@/components/Header";
import SinglePage from "@/components/SinglePage";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default function SingleProductPage({product}) {
    return (
      
        <>
         <Header />
         <Center>
          <Title>
           {product.title}
          </Title>
         </Center>
        </>     
    );
  }

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query
  const product = await Product.find(id)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}
  