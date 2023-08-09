import styled from "styled-components";

const StyledDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  max-width: 1280px;
  letter-spacing: 0.3px;
  padding: 0;
  margin: 0;
  @media screen and (min-width: 312px) {
    padding: 0 20px;
  }
  @media screen and (min-width: 640px) {
    padding: 0 40px;
  }

  @media screen and (min-width: 768px) {
    padding: 0 20px;
  }
  
  @media screen and (min-width: 1024px) {
    padding: 10;
  }

`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
