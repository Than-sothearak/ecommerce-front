import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductGrid = styled.div`
  display: flex;
    flex-wrap: wrap;
  gap: 28px;
  margin-bottom: 40px;
 
  @media screen and (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    
   
   
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