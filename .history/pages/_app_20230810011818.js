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

