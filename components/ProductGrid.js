import { styled } from "styled-components";
import { RevealWrapper } from "next-reveal";
import PcBox from "./PcBox";

const StyledProductGrid = styled.div`
  display: grid;
  gap: 20px;


  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  // @media screen and (min-width: 740px) {
  //   grid-template-columns: repeat(3, 1fr);
  // }

  @media screen and (max-width: 740px) {
   grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
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
