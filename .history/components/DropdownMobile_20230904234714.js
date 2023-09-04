import React from "react";
import styled from "styled-components";
import DropDownTitle from "./DropDownTitle";

function DropDownMobile({ options }) {
  const gamingPcs = options.filter((c) => c.name === "Gaming PCs")[0];
  const subGamingPcs = options.filter((c) => c.parent?.name === gamingPcs.name);
  const gamingPcsUrl= '/gaming-pcs'
  
  const gamingLaptop = options.filter((c) => c.name === "Gaming Laptops")[0];
  const subGamingLaptop = options.filter(
    (c) => c.parent?.name === gamingLaptop.name
  );
  const gamingLaptopsUrl = '/gaming-laptops'
  return (
    <>
      <div className="flex">
        <DropDownTitle options={gamingPcs} subCategory={subGamingPcs} url={gamingPcsUrl}/>
        <DropDownTitle options={gamingLaptop} subCategory={subGamingLaptop} url={gamingLaptopsUrl}/>
      </div>
           
    </>
  );
}

export default DropDownMobile;
export const Content = styled.div`
  position: relative;
  height: 50px;
  right: -300px;
  top: 200px;
  background-color: blue;
  z-index: 40;
`;
