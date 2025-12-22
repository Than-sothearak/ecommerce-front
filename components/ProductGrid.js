import { styled } from "styled-components";
import { RevealWrapper } from "next-reveal";
import PcBox from "./PcBox";

const StyledProductGrid = styled.div`



  @media (min-width: 368px) {
  column-count: 2;
  column-gap: 10px;
  column-count: 2;

    & > * {
    break-inside: avoid-column;
    margin-bottom: 10px;
  }
  }

  @media (min-width: 780px) {
    display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 20px;

  }

  /* Every product card */

`;


export default function ProductGrid({ products, wishedProduct = [], reviews }) {
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
            reviews={reviews}
            wished={wishedProduct.includes(product._id)}/>
          </RevealWrapper>
        ))}
    </StyledProductGrid>
  );
}
