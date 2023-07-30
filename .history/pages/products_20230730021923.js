import Header from "@/components/Header";
import { Product } from "@/models/Products";

export default function ProductsPage () {
    return (
        <Header />
        
    ) 
}

export async function getServerSideProps() {
    const products = await Product.find({}, null , {sort: {'_id':-1}});
    return {props: {
        products: JSON.parse(JSON.stringify(products))
    }}
}