import Center from "@/components/Center"
import Header from "@/components/Header"
import ProductBox from "@/components/ProductBox"
import ProductGrid from "@/components/ProductGrid"
import Title from "@/components/Title"
import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"
import { Product } from "@/models/Products"

export default function CategoryPage ({category,products}) {
    return (

        <>
    <Header />
    <Center>
        <Title>{category.name}</Title>
        <ProductGrid products={products}>
        </ProductGrid>
    </Center>
    </>
    )

    
}

export async function getServerSideProps (context) {
    await mongooseConnect();
    const category = await Category.findById(context.query.id)
    
    //find child category
    const subCategories = await Category.find({parent:category._id});
    const catIds = [category._id, ...subCategories.map(c => c._id)]
    const products = await Product.find({category:catIds})
    return {
        props: {
          category: JSON.parse(JSON.stringify(category)),
          products: JSON.parse(JSON.stringify(products))
        }
    }
}