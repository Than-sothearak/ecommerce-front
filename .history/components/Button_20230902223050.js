import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";
import { BsCart4 } from "react-icons/bs";

export const ButtonStyle = css`
   
  padding: 5px 12px;
  border: 1px solid ${primary};
  border-radius: 20px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 12px;
  color: ${primary};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.3s all ease-out;
  &:hover {
    border: none;
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
    <StyledButton  {...rest}>  <BsCart4 size={18}/> {children} </StyledButton>
  );
}