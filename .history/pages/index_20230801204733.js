
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
  const featuredProductId = '64c8be79d9fedba29e73e0b9'
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