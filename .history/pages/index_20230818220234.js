import Featured from "@/components/Featured";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import NewProduct from "@/components/NewProduct";
import { styled } from "styled-components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import Categories from "./categories";
import { Category } from "@/models/Category";

const Container = styled.div`

`

export default function Home({ wishedProductCat, categories, productOfCategories, products, newProducts, wishedProduct, mainCategories}) {

  return (
    <Container>
      {/* <FeaturedSlider /> */}
      <Featured product={products} />
      <NewProduct
      newProduct={newProducts} 
      wishedProduct={wishedProduct} />
      <Categories
       categories={categories}
       wishedProductCat={wishedProductCat}
       productOfCategories={productOfCategories}
       mainCategories={mainCategories} 
      />
    </Container>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const productOfCategories = {};
  const allFetchProductId = [];
  for (let mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();

    // get or filter all child category object
    const categoriesHaveParent = categories.filter(
      (c) => c?.parent?.toString() === mainCatId
    );

    // get the id of child category
    const childIds = categoriesHaveParent.map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childIds];
    
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    allFetchProductId.push(...products.map(p => p._id.toString()))
    productOfCategories[mainCatId] = products;
  }

  const featuredProduct = await Product.find({}, null, {
    sort: { price: -1 },
    limit: 1,
  });
  const session = await getServerSession(context.req, context.res, authOptions)
  const wishedProduct = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: newProducts.map(p => p._id.toString()),
  }) : [];
  const wishedProductCat = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: allFetchProductId,
  }) : [];
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    
      products: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedProduct: wishedProduct.map(i => i.product.toString()),
      wishedProductCat: wishedProductCat.map(i => i.product.toString()),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      productOfCategories: JSON.parse(JSON.stringify(productOfCategories)),

    },
  };
}
