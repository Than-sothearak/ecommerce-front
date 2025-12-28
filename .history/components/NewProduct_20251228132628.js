import { styled } from "styled-components";
import Center from "./Center";
import ProductGrid from "./ProductGrid";
import Link from "next/link";

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 14px;
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
const Title = styled.h2`
font-size: 2rem;
margin: 30px 0 10px;
font-weight: normal;`

const LinkWrapper = styled.div`
  &:hover {
    text-decoration: underline;
  }
`
const CategoryGrid = styled.div`
display: grid;
  gap: 10px;


  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  // @media screen and (min-width: 740px) {
  //   grid-template-columns: repeat(3, 1fr);
  // }

  @media screen and (max-width: 740px) {
   grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
`;

const NewProduct = ({ newProduct, wishedProduct, reviews }) => {
 
  return (
    <Center>
      <TitleWrapper>
    <Title>New arrivals</Title>
          <LinkWrapper>
                <Link href={"products/"}>Show all</Link>
              </LinkWrapper>
      </TitleWrapper>
  
      <ProductGrid 
      products={newProduct} 
      wishedProduct={wishedProduct}
      reviews={reviews}/>
    </Center>
  );
};

export default NewProduct;
