import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";
import { styled } from "styled-components";
import Link from "next/link";
import Title from "@/components/Title";

const CategoryWrapper = styled.div`
  padding-top: 10px;
`
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

const Categories = ({ mainCategories, productOfCategories, categories, wishedProduct}) => {
  return (
    <CategoryWrapper>
       
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
               
                  <ProductBox 
                  key={product._id} 
                  {...product} 
                  wished={wishedProduct.includes(product._id)}/>
               
              ))}
           
                <ShowAllSquare href={"/category/" + cat._id}>
                  Show all &rarr;
                </ShowAllSquare>
            
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </CategoryWrapper>
  );
};

export default Categories;

