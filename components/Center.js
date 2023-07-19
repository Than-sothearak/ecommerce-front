import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
