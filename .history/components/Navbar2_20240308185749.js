import React, { useState } from "react";
import styled from "styled-components";

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

const Navbar = ({options}) => {
  const [categories] = useState([
    {
      name: "Category 1",
      subcategories: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    },
    {
      name: "Category 2",
      subcategories: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    },
  ]);

  return (
    <NavbarContainer>
      <ul>
        {categories.map((category) => (
          <NavItem key={category.name}>
            {category.name}
            <DropdownMenu className="dropdown-menu">
              {category.subcategories.map((subcategory) => (
                <SubCategory key={subcategory}>{subcategory}</SubCategory>
              ))}
            </DropdownMenu>
          </NavItem>
        ))}
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
