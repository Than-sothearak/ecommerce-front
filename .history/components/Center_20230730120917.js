import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;

  @media screen and (min-width: 640px) {
    padding: 0 100px;
  }

  @media screen and (min-width: 738px) {
    padding: 0 px;
  }
 
  @media screen and (min-width: 900px) {
    padding: 0 60px;
  }
  
  @media screen and (min-width: 1024px) {
    padding: 0 10px;
  }
`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
