import Center from "@/components/Center";
import Header from "@/components/Header";
import SinglePage from "@/components/SinglePage";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";

export default function SingleProductPage() {
    return (
      
        <>
         <Header />
         <Center>
          <Title>

          </Title>
         </Center>
        </>     
    );
  }

export async function getServerSideProps(context) {
  await mongooseConnect();
}
  