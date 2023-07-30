import Center from '@/components/Center'
import Header from '@/components/Header'
import Title from '@/components/Title'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import React from 'react'

const categories = ({parentCategories}) => {
   
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
    return {
      props: {
        parentCategories: JSON.parse
        (JSON.stringify(parentCategories)),
        
      },
    };
  }