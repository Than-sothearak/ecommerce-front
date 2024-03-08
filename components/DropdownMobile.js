import React from "react";
import styled from "styled-components";
import DropDownTitle from "./DropDownTitle";
import DropDownTitleMobile from "./DropDownTitleMobile";

function DropDownMobile({ options }) {
 
  return (
    <>
   
        <DropDownTitleMobile options={options} subCategory={options} />
    
           
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
