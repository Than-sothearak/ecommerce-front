import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";

const NavbarContainer = styled.ul`
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 18px;
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
  position: relative;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    .dropdown-menu {
      display: block;
    }
  }
`;

const DropdownMenu = styled.ul`
   top: 0;
  left: 100%;
  margin-top: -1px;
`;

const DropdownSubMenu = styled.li`
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: -1px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #f1f1f1;
  
`;


const SubCategory = styled.li`
 padding: 10px;

  &:hover {
    text-decoration: underline;
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
     
        <DropdownMenu>
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
              <DropdownSubMenu className="dropdown-menu " tabindex="-1">
                {subcategories
                  .filter((c) => c?.parent._id === category._id)
                  .map((s) => (
                    <SubCategory key={s._id}>
                      <Link href={`/category/${s._id}`}>{s.name}</Link>
                    </SubCategory>
                  ))}
              </DropdownSubMenu>
            )}
          </NavItem>
        ))}
        </DropdownMenu>
    
    </NavbarContainer>
  );
};

export default Navbar;
