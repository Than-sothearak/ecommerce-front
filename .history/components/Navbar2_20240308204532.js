import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";

const NavbarContainer = styled.nav`
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding: 14px;
`;

const Icon = styled.li`
  cursor: pointer;
  &:hover {
    .dropdown-menu {
      display: block;
    }
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
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
  z-index: 1;
  left: 170px;
  gap: 0;
 
`;

const SubCategory = styled.li`
  
  top: 20px;
  padding: 8px 12px;
  background-color: #444;
  position: relative;
  z-index: 2;
  cursor: pointer;
  width: 130px;
  
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
            {subcategories.filter((c) => c?.parent._id === category._id)[0]
              ?.name && (
              <Icon>
                <MdArrowForwardIos />
              </Icon>
            )}

            {subcategories.filter((c) => c?.parent._id === category._id)[0]
              ?.name && (
              <DropdownMenu className="dropdown-menu">
                {subcategories
                  .filter((c) => c?.parent._id === category._id)
                  .map((s) => (
                    <SubCategory key={s._id}
                    >
                    <Link href={`/category/${s._id}`}>
                    {s.name}
                    </Link>
                    </SubCategory>
                  ))}
              </DropdownMenu>
            )}
          </NavItem>
        ))}
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
