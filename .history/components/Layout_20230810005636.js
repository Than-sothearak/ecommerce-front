import Footer from "./Footer";
import HeaderNew from "./HeaderNew";

 
export default function Layout({ children }) {
  return (
    <>
      <HeaderNew />
      <main>{children}</main>
      <Footer />
    </>
  )
}