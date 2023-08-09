import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import HeaderNew from "./Navbar";

 
export default function Layout({ children, categories }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProduct = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const featuredProduct = await Product.find({}, null, {
    sort: { price: -1 },
    limit: 1,
  });
  const categories = await Category.find()
  const mainCategories = categories.filter(c => !c.parent)
  return {
    props: {
      products: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      categories: JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories))
    },
  };
}