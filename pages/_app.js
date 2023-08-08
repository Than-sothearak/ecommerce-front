import '@/styles/globals.css'
import { createGlobalStyle } from "styled-components";
import {CartContextProvider }from "@/components/CartContext";

const GlobalStyle = createGlobalStyle`

body{
  
  font-family: 'Roboto', sans-serif;
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
