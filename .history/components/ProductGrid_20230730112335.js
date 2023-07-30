import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 28px;
  margin-bottom: 40px;
 
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
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