import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DropDownTitle from "./DropDownTitle";
import Link from "next/link";
function DropDownNew({
  options,
}) {
  const computer = options.filter(c => c.name === 'Computer')[0]
  const subComputer = options.filter((c) => c.parent?.name  === computer.name)

  const gamingLaptop = options.filter(c => c.name === 'Gaming Laptops')[0]
  const subGamingLaptop = options.filter((c) => c.parent?.name  === gamingLaptop.name)
  return (
    <>
   <NavLink2 href={`/category/${computer?._id}`}><DropDownTitle options={computer} subCategory={subComputer}/></NavLink2>
  <NavLink2 href={`/category/${gamingLaptop?._id}`}> <DropDownTitle options={gamingLaptop}subCategory={subGamingLaptop}/>
</NavLink2>   
    </>
  );
}

export default DropDownNew;

const NavLink2 = styled(Link)`
  display: flex;
  text-decoration: none;
  padding: 10px 0;
  &:focus {
    outline: none;
  }

  &:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  }

  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;
export const Content = styled.div`
  position: relative;
  height: 50px;
  right: -300px;
  top: 200px;
  background-color: blue;
  z-index: 40;
`;
