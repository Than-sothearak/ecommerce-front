import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Products'
import NewProduct from '@/components/NewProduct'
import FeaturedSlider from '@/components/FeaturedSlider'

export default function Home({product, newProduct}) {
  return (
    <div>
      <Header />
      <FeaturedSlider />
      <Featured product={product}/>
      
      <NewProduct newProduct={newProduct}/>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '64b2e197ea7a1c8d83e4b65a'
  await mongooseConnect();
  const newProduct = await Product.find({}, null, {sort: {'_id':-1}, limit:10 });
  const featuredProduct = await Product.findById(featuredProductId);
  return {
    props: {
      product: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct))
    },
  };
}