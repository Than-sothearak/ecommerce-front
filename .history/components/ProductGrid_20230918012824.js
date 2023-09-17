import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "next-reveal";
import PcBox from "./PcBox";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  transition: visibility 1s linear;
 
  @media screen and (min-width: 740px) {
    grid-template-columns: 1fr 1fr;
  }


  @media screen and (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export default function ProductGrid({ products, wishedProduct = [], reviews=[] }) {
  return (
    <StyledProductGrid>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper
            key={product._id}
            delay={50*index}
            duration={1000}
          >
            <PcBox {...product}
            reviews={reviews.includes(product._id)}
            wished={wishedProduct.includes(product._id)}/>
          </RevealWrapper>
        ))}
    </StyledProductGrid>
  );
}
