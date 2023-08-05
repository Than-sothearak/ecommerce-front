import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Products";
import { styled } from "styled-components";

const CategoryTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
 
`;
const FilterContainer = styled.div`
display: flex;
justify-content: center;
`
const FilterWrapper = styled.div`
display: flex;
`
const Filter = styled.div`

`
export default function CategoryPage({ category,products}) {
  console.log(category)
  return (
    <>
      <Header />
      <Center>
        <FilterContainer>
        <CategoryTitle>
          <Title>{category.name}</Title>
        </CategoryTitle>
        <FilterWrapper>
        {category.properties.map(property => (
          <Filter key={property.name}>
            <h1>{property.name}</h1>
            <select>
              {property.values.map((value, index) => (
                <option key={index}>
                  {value}
                </option>
              ))}
            </select>
          </Filter>
        ))}
        </FilterWrapper>
        </FilterContainer>
       
        
        <ProductGrid products={products}></ProductGrid>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const parentCategory = await Category.findById(context.query.id);
  //find child category
  const childCategory = await Category.find({ parent: parentCategory._id})
  const childIds = childCategory.map((c) => c._id);
  const catIds = [parentCategory._id, ...childIds]
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(parentCategory)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
