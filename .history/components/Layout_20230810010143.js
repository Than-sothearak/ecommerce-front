import Footer from "./Footer";
import Header from "./Header";
import HeaderNew from "./HeaderNew";

 
export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}