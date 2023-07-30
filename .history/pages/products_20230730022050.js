import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/models/Products";

export default function ProductsPage ({products}) {
    return (
       <Header>
         <Center>
            
            </Center>
       </Header>
    ) 
}

export async function getServerSideProps() {
    const products = await Product.find({}, null , {sort: {'_id':-1}});
    return {props: {
        products: JSON.parse(JSON.stringify(products))
    }}
}