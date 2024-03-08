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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
  
  const categories = []

  for (let mainCat of mainCategories) {
    const mainCatId = mainCat;

    // get or filter all child category object
    const categoriesHaveParent = options.filter(
      (c) => c?.parent?.toString() === mainCatId._id
    );

    // get the id of child category
    const childIds = categoriesHaveParent.map((c) => c);
    const categoriesIds = [mainCatId, ...childIds]; 
    categories = categoriesIds
  }
  

  return (
    <NavbarContainer>
      <ul>
        {mainCategories.map((category) => (
          <NavItem key={category.name}>
            <Link href={`/category/${category._id}`}>{category.name}</Link>
            <MdArrowForwardIos />
            <DropdownMenu className="dropdown-menu">
              {subcategories.filter((c) => c?.parent._id === category._id)[0]
                ?.name && (
                <SubCategory>
                  {
                    subcategories.filter(
                      (c) => c?.parent._id === category._id
                    )[0]?.name
                  }
                </SubCategory>
              )}
            </DropdownMenu>
          </NavItem>
        ))}
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
