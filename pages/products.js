import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { styled } from "styled-components";
import Link from "next/link";
import Title from "@/components/Title";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./api/auth/[...nextauth]";
import PcBox from "@/components/PcBox";
import { primary } from "@/lib/colors";
import { Review } from "@/models/Review";


const Categories = ({ mainCategories, productOfCategories, categories, wishedProduct,reviews}) => {
  return (
    <>
  
      <Center>
        {mainCategories.map((cat) => (
          <CategoryWrapper key={cat._id}>
            <CategoryTitle>
              <Title>{cat.name}</Title>
              <LinkWrapper>
                <Link href={"/category/" + cat._id}>Show all</Link>
              </LinkWrapper>
            </CategoryTitle>
            <CategoryGrid>
              {productOfCategories[cat._id].map((product, index) => (
               
                  <PcBox 
                  key={product._id} 
                  {...product} 
                  reviews={reviews}
                  wished={wishedProduct.includes(product._id)}/>
               
              ))}
           
                <ShowAllSquare href={"/category/" + cat._id}>
                  Show all &rarr;
                </ShowAllSquare>
            
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
  
    </>
  );
};

export default Categories;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { _id: -1 } });
  const mainCategories = categories.filter((c) => !c.parent);
  const product = await Product.find()
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
    
    const products = await Product.find({ category: categoriesIds, status:1 }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    allFetchProductId.push(...products.map(p => p._id.toString()))
    productOfCategories[mainCatId] = products;
  }

  const session = await getServerSession(context.req, context.res, authOptions)
  const wishedProduct = session?.user ? await WishedProduct.find({
    userEmail: session.user.email,
    product: allFetchProductId,
  }) : [];
  const reviews = await Review.find({product:allFetchProductId.map(p => p)})

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),

      categories:JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      productOfCategories: JSON.parse(JSON.stringify(productOfCategories)),
      wishedProduct: wishedProduct.map(i => i.product.toString())
    },
  };
}
const LinkWrapper = styled.div`
  &:hover {
    text-decoration: underline;
  }
`
const CategoryGrid = styled.div`
display: grid;
  gap: 20px;


  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  // @media screen and (min-width: 740px) {
  //   grid-template-columns: repeat(3, 1fr);
  // }

  @media screen and (max-width: 740px) {
   grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 14px;
  margin-bottom: 0;
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
  margin-bottom: 80px;
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
  margin-top: 20px;
  &:hover {
    text-decoration: underline;
    background-color: ${primary};
    color: white;
  }
`;
