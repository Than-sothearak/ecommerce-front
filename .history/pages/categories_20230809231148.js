import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";
import { RevealWrapper } from "next-reveal";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { styled } from "styled-components";
import Link from "next/link";
import Title from "@/components/Title";
import { Product } from "@/models/Products";
import Footer from "@/components/Footer";
import HeaderNew from "@/components/HeaderNew";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

const categories = ({ mainCategories, productOfCategories, categories }) => {
  return (
    <>
      <HeaderNew
        categories={categories}
      />
      <Center>
        {mainCategories.map((cat) => (
          <CategoryWrapper key={cat._id}>
            <CategoryTitle>
              <Title>{cat.name}</Title>
              <div>
                <Link href={"/category/" + cat._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {productOfCategories[cat._id].map((product, index) => (
               
                  <ProductBox key={product._id} {...product} />
               
              ))}
           
                <ShowAllSquare href={"/category/" + cat._id}>
                  Show all &rarr;
                </ShowAllSquare>
            
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
      <Footer />
    </>
  );
};

export default categories;

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const product = await Product.find()
  const productOfCategories = {};

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
    productOfCategories[mainCatId] = products;
    
  }
  return {
    props: {
      categories:JSON.parse(JSON.stringify(categories)),
      product:JSON.parse(JSON.stringify(product)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      productOfCategories: JSON.parse(JSON.stringify(productOfCategories)),
    },
  };
}
