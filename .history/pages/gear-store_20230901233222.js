import Center from '@/components/Center';
import FeaturedSlider from '@/components/FeaturedSlider';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import React from 'react'

const GearStore = ({mainCategories}) => {
  return (
    <Center>
        <div>
            <FeaturedSlider />
            <div>
                <div className='border border-black'>

                </div>
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