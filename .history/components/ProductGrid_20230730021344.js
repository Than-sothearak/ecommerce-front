import { styled } from "styled-components";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 28px;
  margin-bottom: 40px;
  
`;
export default function ProductGrid ({products}) {
    return (
        <StyledProductGrid>

        </StyledProductGrid>
    )
  
}