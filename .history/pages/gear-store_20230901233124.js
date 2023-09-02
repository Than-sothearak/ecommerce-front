import Center from '@/components/Center';
import FeaturedSlider from '@/components/FeaturedSlider';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Product } from '@/models/Products';
import React from 'react'
import { authOptions } from './api/auth/[...nextauth]';

const GearStore = ({mainCategories}) => {
  return (
    <Center>
        <div>
            <FeaturedSlider />
            <div>
                <div></div>
            </div>
        </div>
    </Center>
  )
}

export default GearStore;

export async function getServerSideProps(context) {
await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);

  return {
    props: {
      categories:JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories))
    },
  };
}