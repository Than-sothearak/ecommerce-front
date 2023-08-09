import Footer from "./Footer";
import Navbar from "./Navbar";


 
export default function Layout({ children, categories }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
