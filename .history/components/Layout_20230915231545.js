import Footer from "./Footer";
import Header from "./Header";
import NextTopLoader from "nextjs-toploader";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <NextTopLoader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
