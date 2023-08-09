import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";


 
export default function Layout({ children}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
