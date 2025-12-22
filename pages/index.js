import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProduct from "@/components/NewProduct";
import { styled } from "styled-components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { Category } from "@/models/Category";
import { Setting } from "@/models/Setting";
import { Review } from "@/models/Review";
import Featured from "@/components/Featured";

const Container = styled.div``;

export default function Home({
  products,
  featuredProducts,
  newProducts,
  wishedProduct,
  reviews
}) {
const COMPUTER_PRODUCTS = [
  {
    id: "pc-01",
    name: "Quantum Series G-7",
    specs: "RTX 4080 | i9-14900K | 64GB DDR5",
    price: "$2,499.00",
    image: "https://images.unsplash.com/photo-1587202377405-83616597040c?auto=format&fit=crop&q=80&w=800",
    link: "/products/quantum-g7"
  },
  {
    id: "pc-02",
    name: "Nebula Workstation",
    specs: "Threadripper 7000 | 128GB RAM | 4TB NVMe",
    price: "$4,120.00",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
    link: "/products/nebula-work"
  }
];
  return (
    <Container>
      <Featured products={featuredProducts} />
  
      <NewProduct 
        newProduct={newProducts} 
        wishedProduct={wishedProduct} 
        reviews={reviews}
      />
  
    </Container>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 12,
  });
  const reviews = await Review.find({product: newProducts.map(p => p._id)},)

  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const products = await Product.find();
    const setting = await Setting.findOne({ name: "featuredProductId" });
  // ensure it's an array
  const featuredProductIds = Array.isArray(setting?.value)
    ? setting.value
    : setting?.value?.split(",") || [];
  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  
    const featuredProducts = await Product.find({ _id: { $in: featuredProductIds } });
  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedProduct: wishedProduct.map((i) => i.product.toString()),
    },
  };
}
