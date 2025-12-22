import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowForwardIos, MdOutlineDevices } from "react-icons/md";

const NavbarContainer = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 64px 0;
  width: 100%;
  background-color: white;
  right: 0;
  top:84px;
  margin: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
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
  border-left: 1px solid #e5e7eb;
  text-decoration: line;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;
  padding: 20px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
    .dropdown-menu {
      display: block;
    }
  }
`;

const DropdownMenu = styled.ul`
  top: 0;
  display: flex;
  margin-top: -1px;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const DropdownSubMenuList = styled.ul`
  margin-top: -1px;
  z-index: 80;
`;

const DropdownSubMenu = styled.li`
  display: none;
  position: absolute;
  background-color: white;
  top: 2px;
  left: 100%;
  z-index: 1;
  margin-top: -1px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DropdownMenu2 = ({ options }) => {
  const mainCategories = options.filter((c) => !c.parent);
  const subcategories = options.filter((c) => c.parent);

  return (
    <NavbarContainer>
  
       <DropdownMenu>
        {mainCategories.map((category) => (
          <Link key={category.name} href={`/category/${category._id}`}>
            <NavItem>
               <MdOutlineDevices size={24} />
              {category.name}
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
                      <DropdownSubMenuList key={s._id}>
                        
                        <Link href={`/category/${s._id}`}>
                          <NavItem> {s.name}</NavItem>
                        </Link>
                      </DropdownSubMenuList>
                    ))}
                </DropdownSubMenu>
              )}
            </NavItem>
           
          </Link>
        ))}
      </DropdownMenu>

    </NavbarContainer>
  );
};

export default DropdownMenu2;
