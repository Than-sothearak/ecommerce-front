import '@/styles/globals.css'
import { createGlobalStyle } from "styled-components";
import {CartContextProvider }from "@/components/CartContext";

const GlobalStyle = createGlobalStyle`

body{
  background-color: #f0f0f0;
  padding:0;
  margin:auto;
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
