import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";

const GlobalStyle = createGlobalStyle`

body{
  
  font-family: 'Roboto', sans-serif;
}
`;

export default function App({ Component, pageProps: {session, ...pageProps}}) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
