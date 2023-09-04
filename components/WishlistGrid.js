import { styled } from "styled-components";
import {RevealWrapper} from "next-reveal";
import WishlistBox from "./WishlisBox";


const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
 

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
    grid-template-columns: 1fr 1fr 1fr;
   
  } 
`;
export default function WishlistGrid ({products, wishedProduct=[]}) {
    return (
        <StyledProductGrid>
       
         {products?.length > 0 && products.map((product, index) => (
        
              
            <WishlistBox
              key={product?._id} 
              {...product} 

              wished={wishedProduct.includes(product?._id)} />
         ))}
        
        </StyledProductGrid>
    )
  
}