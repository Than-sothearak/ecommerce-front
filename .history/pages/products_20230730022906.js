import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/models/Products";
import ProductBox from "./ProductBox";
export default function ProductsPage ({products}) {
    return (
       <Header>
         <Center>
            <ProductGrid products={products}>
            {products?.length > 0 && products.map(product => (
            <ProductBox key={product._id} {...product} />
         ))}
            </ProductGrid>
            
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