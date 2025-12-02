import styled from "styled-components";

const StyledDiv = styled.div`
 
  max-width: 1280px;
  letter-spacing: 0.3px;
  margin: 0 auto;
  padding: 0;
  @media screen and (min-width: 312px) {
    padding: 0 10px;
  }
  @media screen and (min-width: 740px) {
    padding: 0 40px;
  }
  
  @media screen and (min-width: 1024px) {
    padding: 30px;
  }

`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
