import {CartContextProvider} from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";

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
