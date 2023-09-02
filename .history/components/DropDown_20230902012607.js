import React from "react";
import styled from "styled-components";
import DropDownTitle from "./DropDownTitle";
function DropDownNew({ options }) {
  const computer = options.filter((c) => c.name === "Computer")[0];
  const subComputer = options.filter((c) => c.parent?.name === computer.name);

  const gamingLaptop = options.filter((c) => c.name === "Gaming Laptops")[0];
  const subGamingLaptop = options.filter(
    (c) => c.parent?.name === gamingLaptop.name
  );
  return (
    <>
      <div>
        <DropDownTitle options={computer} subCategory={subComputer} />
      </div>
      
        <DropDownTitle options={gamingLaptop} subCategory={subGamingLaptop} />
     
    </>
  );
}

export default DropDownNew;
export const Content = styled.div`
  position: relative;
  height: 50px;
  right: -300px;
  top: 200px;
  background-color: blue;
  z-index: 40;
`;
