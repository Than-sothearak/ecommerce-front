import Center from "@/components/Center";
import Header from "@/components/Header";
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
    const {id} = context.query;
    const product = await Product.findById(id);
    console.log(product)
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      }
    }
  }
  