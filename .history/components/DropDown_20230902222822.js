import React from "react";
import styled from "styled-components";
import DropDownTitle from "./DropDownTitle";
function DropDownNew({ options }) {
  const gamingPcs = options.filter((c) => c.name === "Gaming PCs")[0];
  const subGamingPcs = options.filter((c) => c.parent?.name === gamingPcs.name);
  console.log(options)
  const gamingLaptop = options.filter((c) => c.name === "Gaming Laptops")[0];
  const subGamingLaptop = options.filter(
    (c) => c.parent?.name === gamingLaptop.name
  );
  return (
    <>
      <div>
        <DropDownTitle options={gamingPcs} subCategory={subGamingPcs} />
      </div>
           
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
