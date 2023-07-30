import Center from '@/components/Center'
import Header from '@/components/Header'
import Title from '@/components/Title'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import { Product } from '@/models/Products'
import React from 'react'

const categories = ({parentCategories, categoriesProducts}) => {
   
  return (
    <>
    <Header />
    <Center>
       <Title>
        All categories
         {parentCategories.map(cat => (
            <div key={cat._id}>
                <h2>{cat.name}</h2>
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
    const parentCategories = categories.filter(c => !c.parent)
    console.log(parentCategories)
    const categoriesProducts = {};
    for (let mainCat of parentCategories) {
     const products = await Product.find({category: mainCat._id}, null,{limit:3, sort:{'_id':-1}})
     categoriesProducts[mainCat._id] = products;
    }
    return {
      props: {
        parentCategories: JSON.parse
        (JSON.stringify(parentCategories)),
        categoriesProducts: JSON.parse
        (JSON.stringify(categoriesProducts)),
      },
    };
  }