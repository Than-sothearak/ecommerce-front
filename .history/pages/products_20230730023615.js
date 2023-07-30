import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/models/Products";

export default function ProductsPage ({allProducts}) {
    return (
       <Header>
         <Center>
            <ProductGrid products={allProducts}>
            </ProductGrid>
            
         </Center>
       </Header>
    ) 
}

export async function getServerSideProps() {
    const allProducts = await Product.find({}, null , {sort: {'_id':-1}});
    console.log({allProducts})
    return {props: {
        allProducts: JSON.parse(JSON.stringify(allProducts))
    }}
}