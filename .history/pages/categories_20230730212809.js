import Center from '@/components/Center'
import Header from '@/components/Header'
import Title from '@/components/Title'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import React from 'react'

const categories = ({categories}) => {
  return (
    <>
    <Header />
    <Center>
       <Title>
        All categories
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