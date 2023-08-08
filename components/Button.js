import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";
import { BsCart4 } from "react-icons/bs";

export const ButtonStyle = css`
   
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 14px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${primary};
  transition: 0.3s all ease-out;
  &:hover {
   transition: 0.3s all ease-in;
   transform: scale(1.1);
   background-color: ${primary};
   color: white;
 }
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children,...rest}) {
  return (
    <StyledButton  {...rest}>  <BsCart4 size={24}/> {children} </StyledButton>
  );
}