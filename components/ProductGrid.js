import { styled } from "styled-components";
import { RevealWrapper } from "next-reveal";
import PcBox from "./PcBox";

const StyledProductGrid = styled.div`
  column-count: 2;
  column-gap: 10px;

  @media (min-width: 768px) {
    column-count: 3;
  }

  @media (min-width: 1280px) {
    column-count: 4;
  }

  /* Every product card */
  & > * {
    break-inside: avoid-column;
    margin-bottom: 10px;
  }
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
