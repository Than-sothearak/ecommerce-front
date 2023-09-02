import "@/styles/globals.css";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";

const GlobalStyle = createGlobalStyle`



  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300&family=Rubik+Iso&display=swap');


body{
  padding: 0;
  margin: 0;
  background-color: red;
  font-family: HCo Gotham SSm,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;;
}
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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
