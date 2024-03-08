import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const NestedDropdownItem = styled(DropdownItem)`
  padding-left: 20px;
`;

const DropdownMenu = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggle}>{title}</DropdownButton>
      <DropdownContent open={open}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.children ? (
              <NestedDropdownItem>{item.label}</NestedDropdownItem>
            ) : (
              <DropdownItem>{item.label}</DropdownItem>
            )}
            {item.children && (
              <DropdownContent open={open}>
                {item.children.map((childItem, childIndex) => (
                  <NestedDropdownItem key={childIndex}>{childItem.label}</NestedDropdownItem>
                ))}
              </DropdownContent>
            )}
          </React.Fragment>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownMenu;
