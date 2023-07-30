import Center from '@/components/Center'
import Header from '@/components/Header'
import Title from '@/components/Title'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import { Product } from '@/models/Products'
import React from 'react'

const categories = ({mainCategories, categoriesProducts}) => {
   
  return (
    <>
    <Header />
    <Center>
       <Title>
        All categories
         {mainCategories.map(cat => (
            <div key={cat._id}>
                <h2><strong>{cat.name}</strong></h2>
                {categoriesProducts[cat._id].map(p => (
                 <p className='text-sm'>{p.title}</p>
                ))}
            </div>
         ))}
       </Title>
      
    </Center>
    </>
  )
}

export default categories;

export async function getServerSideProps() {
    await mongooseConnect();
    const categories = await Category.find();
    const mainCategories = categories.filter(c => !c.parent)
    console.log(mainCategories)
    const categoriesProducts = {};
    for (let mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childIds = categories
        .filter(c => c?.parent?.toString() === mainCatId)
        .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childIds];
     const products = await Product.find({category: categoriesIds}, null,{limit:10, sort:{'_id': 1}})
     categoriesProducts[mainCatId] = products;
    }
    return {
      props: {
        mainCategories: JSON.parse
        (JSON.stringify(mainCategories)),
        categoriesProducts: JSON.parse
        (JSON.stringify(categoriesProducts)),
      },
    };
  }