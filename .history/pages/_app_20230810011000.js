import '@/styles/globals.css'
import { createGlobalStyle } from "styled-components";
import {CartContextProvider }from "@/components/CartContext";
import Layout from '@/components/Layout';

const GlobalStyle = createGlobalStyle`

body{
  
  font-family: 'Roboto', sans-serif;
}
`;

export default function App({ Component, pageProps,}) {
  return (
    <>
      <GlobalStyle />
      <Layout>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
      </Layout>
      
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProduct = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const featuredProduct = await Product.find({}, null, {
    sort: { price: -1 },
    limit: 1,
  });
  const categories = await Category.find()
  const mainCategories = categories.filter(c => !c.parent)
  return {
    props: {
      products: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories))
    },
  };
}
