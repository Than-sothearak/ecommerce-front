import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";

const NavbarContainer = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
  position: absolute;
`;

const NavItem = styled.li`
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  &:hover {
    .dropdown-menu {
      display: block;
    }
  }
`;

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  z-index: 10;
  right: -90px;
  background-color: #444;
  padding: 10px;
`;

const SubCategory = styled.li`
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    color: #00bcd4;
    .dropdown-menu {
      display: block;
    }
  }
`;

const Navbar = ({ options }) => {
  const mainCategories = options.filter((c) => !c.parent);
  const subcategories = options.filter((c) => c.parent);
 
  return (
    <NavbarContainer>
      <ul>
        {mainCategories.map((category) => (
          <NavItem key={category.name}>
            <Link href={`/category/${category._id}`}>{category.name}</Link>
            <MdArrowForwardIos />
            <DropdownMenu className="dropdown-menu">
              <SubCategory>
                {
                  subcategories.filter((c) => c?.parent._id === category._id)[0]?.name
                  
                }
              </SubCategory>
            </DropdownMenu>
          </NavItem>
        ))}
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
