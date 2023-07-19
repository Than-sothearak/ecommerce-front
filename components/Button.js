import { css, styled } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  svg {
    height: 20px;
    margin-right: 5px;
  }
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #fff;
      color: white;
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      color: #fff;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;
const StyledBtoon = styled.button`${ButtonStyle}`;

const Button = ({ children, ...rest }) => {
  return <StyledBtoon {...rest}>{children}</StyledBtoon>;
};

export default Button;
