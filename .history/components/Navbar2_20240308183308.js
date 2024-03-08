import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #333;
`;

const NavItem = styled.li`
  position: relative;
  display: inline-block;
  padding: 10px;
  color: #fff;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  padding: 10px;
`;

const SubItem = styled.li`
  padding: 5px 0;
`;

const Navbar = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const categories = [
    {
      name: 'Category 1',
      subcategories: ['Subcategory 1.1', 'Subcategory 1.2', 'Subcategory 1.3'],
    },
    {
      name: 'Category 2',
      subcategories: ['Subcategory 2.1', 'Subcategory 2.2', 'Subcategory 2.3'],
    },
    {
      name: 'Category 3',
      subcategories: ['Subcategory 3.1', 'Subcategory 3.2', 'Subcategory 3.3'],
    },
  ];

  return (
    <NavbarContainer>
      <ul>
        {categories.map((category, index) => (
          <NavItem
            key={index}
            onMouseEnter={() => setOpenCategory(index)}
            onMouseLeave={() => setOpenCategory(null)}
          >
            {category.name}
            <DropdownMenu isOpen={openCategory === index}>
              {category.subcategories.map((subcategory, subIndex) => (
                <SubItem key={subIndex}>{subcategory}</SubItem>
              ))}
            </DropdownMenu>
          </NavItem>
        ))}
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
