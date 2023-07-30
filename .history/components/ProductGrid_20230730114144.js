import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-bottom: 40px;
  padding: 0 20px;

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 20px;
  }
 
  @media screen and (min-width: 738px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 20px;
  }
 
  @media screen and (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }
  
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0 10px;
  }
`;
export default function ProductGrid ({products}) {
    return (
        <StyledProductGrid>
         {products?.length > 0 && products.map(product => (
            <ProductBox key={product._id} {...product} />
         ))}
        </StyledProductGrid>
    )
  
}