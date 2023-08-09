import Footer from "./Footer";
import Header from "./Header";
import HeaderNew from "./HeaderNew";

 
export default function Layout({ children, categories }) {
  return (
    <>
      <HeaderNew categories={categories}/>
      <main>{children}</main>
      <Footer />
    </>
  )
}