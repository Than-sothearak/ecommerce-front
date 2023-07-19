import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Products'

const inter = Inter({ subsets: ['latin'] })

export default function Home({product}) {
  return (
    <div>
      <Header />
      <Featured product={product}/>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '64b2e197ea7a1c8d83e4b65a'
  mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: {product: JSON.parse(JSON.stringify(product))},
  };
}