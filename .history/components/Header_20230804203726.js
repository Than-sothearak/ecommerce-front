import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import { useState } from "react";
import { BsCart } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import {BiSearchAlt2} from "react-icons/bi";
import { AiFillCloseSquare } from 'react-icons/ai'

const StyledHeader = styled.header`
  letter-spacing: 0.5px;
  background-color: #0984e3;
  
`;
const Logo = styled(Link)`
  ${(props) =>
    props.mobilenavActive
      ? `
    display: none;

  `
      : `
    display: flex;
  `}
  align-items: center;
  color: #fff;
  text-decoration: none;
 
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
 
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobilenavActive
      ? `
    display: absolute;
  `
      : `
    display: none;
  `}
  width: 100%;
  align-items: center;
  position: relative;
  bottom: 0;
  gap: 20px;
  right: 10px;
  padding: 50px 20px 20px;
  @media screen and (min-width: 768px) {
    right: 10px;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 10px 0;
 
  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 4;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const NavAccountBox = styled.div`
 ${(props) =>
    props.mobilenavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  position: relative;
  bottom: 0;
  right: 100px;
  padding: 50px 20px 20px;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavCart = styled(Link)`
  padding: 14px 15px;
  border-radius: 30px;
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
`;
const NavAcc = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;

  @media screen and (min-width: 640px) {
    padding: 14px 15px;
    border-radius: 30px;
    height: 54px;
    color: white;
    background-color: transparent;
    display: flex;
    gap: 10px;
    align-items: center;
    &:hover {
      background-color: #096fd3;
    }
  }
`;
const CartNum = styled.p`
  font-size: smaller;
  text-align: center;
  background-color: #ffa502;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: absolute;
  left: 28px;
  bottom: 28px;
`;
const SearchbarBox = styled.div`
${(props) =>
    props.mobilenavActive
      ? `
    display: none;
  `
      : `
    display: flex;
  `}
  background-color: white;
  align-items: center;
  margin: 0 20px 0 20px;
  width: 100%;
  color: white;
  font-size: small;
  font-weight: normal;
  z-index: 3;
  height: 40px;
  border-radius: 40px;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
  
`;
const SearchBox = styled.div`

   width: 100%;
   display: flex;
   justify-content: space-between;
`
const SearchInput = styled.input`
margin-left: 20px;
width: 100%;
  outline: none;
  color: black;
  background: transparent;
  padding: 0 10px;
 
`;

const SearchIcon = styled.div`
width: 30px;
height: auto;
color: gray;
`

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"} mobilenavActive={mobileNavActive}>Ecommerce</Logo>
          <SearchbarBox mobilenavActive={mobileNavActive}>
            <SearchBox>
            <SearchInput type="text" id="fname" name="fname"></SearchInput>
            <SearchIcon>
              <BiSearchAlt2 className="text-black text-2xl" />
            </SearchIcon>
            </SearchBox>
          </SearchbarBox>
          <StyledNav mobilenavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
          </StyledNav>

          <NavAccountBox mobilenavActive={mobileNavActive}>
            <NavAcc href={"/account"}>
              <BiUser size={24} />
              <div>
                <p className="text-sm font-normal">Sign In</p>
                <p className="text-lg font-medium"> Account</p>
              </div>{" "}
            </NavAcc>

            <NavCart href={"/cart"}>
              <BsCart size={28} color="white" />
              <CartNum>{cartProducts.length}</CartNum>
            </NavCart>
          </NavAccountBox>

          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            {!mobileNavActive? <BarsIcon /> : <AiFillCloseSquare size={30}/>}
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
