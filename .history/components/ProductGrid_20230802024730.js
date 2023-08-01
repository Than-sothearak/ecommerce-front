import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import {RevealWrapper} from "next-reveal";
const StyledProductGrid = styled.div`
  display: grid;
  
  justify-content: center;
  gap: 25px;
  z-index: 5;


  @media screen and (max-width: 280px) {
    grid-template-columns: 1fr;
    
  }

  @media screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
   
  }
`;
export default function ProductGrid ({products}) {
    return (
        <StyledProductGrid>
        
         {products?.length > 0 && products.map((product, index) => (
            <RevealWrapper  key={product._id} delay={index*50}>
            <ProductBox {...product} />
            </RevealWrapper>
         ))}
       
        </StyledProductGrid>
    )
  
}