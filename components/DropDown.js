import React from "react";
import styled from "styled-components";
import DropDownTitle from "./DropDownTitle";

function DropDownNew({ options }) {
 
  return (
    <>
      <div className="flex">
        <DropDownTitle options={options} subCategory={options} />
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
