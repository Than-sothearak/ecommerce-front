import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'
import React from 'react'

const categories = () => {
  return (
    <>
    <Header />
    <Center>
        <h1>Hel</h1>
    </Center>
    </>
  )
}

export default categories;

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Category.findById(id);
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        
      },
    };
  }