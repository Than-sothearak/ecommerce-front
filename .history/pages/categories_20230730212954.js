import Center from '@/components/Center'
import Header from '@/components/Header'
import Title from '@/components/Title'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import React from 'react'

const categories = ({categories}) => {
    console.log(categories)
  return (
    <>
    <Header />
    <Center>
       <Title>
        All categories
         {categories.map(cat => (
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
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        
      },
    };
  }