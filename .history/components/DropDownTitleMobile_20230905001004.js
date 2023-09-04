import React, { useState, useRef, useEffect } from "react";
import {
  DropDownWrapper,
  DropDownButton,
  SVG,
  OptionMenu,
  OptionRow,
  SvgTest,
  Label,
} from "./DropDownNew.styles";

import styled from "styled-components";
import Link from "next/link";

function DropDownTitleMobile ({
  defaultText = "Categories",
  options,
  subCategory,
  url,
}) {
  const [actionDropDown, setActionDropDown] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const dropdownEl = useRef(null);
  const [mainDefaultText, setMainDefaultText] = useState(options);

  const dropdown = () => {
    setActionDropDown(!actionDropDown);
  };

  const handleClickClose = (event) => {
    const path = event.composedPath();

    let isClickInside = path.find((element) => element === dropdownEl.current);

    if (isClickInside === undefined) {
      if (actionDropDown) {
        setActionDropDown(false);
      }
    }
  };

  useEffect(() => {
    setMainDefaultText(options);
  }, [options, subCategory]);

  useEffect(() => {
    document.addEventListener("mouseup", handleClickClose);
    return () => {
      document.removeEventListener("mouseup", handleClickClose);
    };
  });
  
  return (
    <>
    <DropDownWrapper

    >
      <div ref={dropdownEl}>
        <DropDownButtonMobile 
           onClick={dropdown}   
        >
         {mainDefaultText?.name}
          <SVG
       
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </SVG>
        </DropDownButtonMobile>
        
        {subCategory && (
           <DropDownWrapper>
           {actionDropDown && (
             <>
               <OptionMenu 
                role="menu"
                onMouseEnter={() => setActionDropDown(true)}
                onMouseLeave={() => setActionDropDown(false)}  
               >
                  <Link href={url}>
                <OptionRow>
                
                  <Label>{`All ${options?.name}`}</Label>
             
                  <SvgTest>
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor"
                         >
                           <path
                             fillRule="evenodd"
                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                             clipRule="evenodd"
                           />
                         </svg>
                       </SvgTest>
                </OptionRow>
                     </Link>
                 {subCategory
                   .map((option, index) => (
                 <>
                    <Link href={url+"/"+ option?.name}>
                     <OptionRow
                       key={index}
                     >
                    
                      <Label>{`${option.name}`}</Label>
                    
                     
                       <SvgTest>
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           viewBox="0 0 20 20"
                           fill="currentColor"
                         >
                           <path
                             fillRule="evenodd"
                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                             clipRule="evenodd"
                           />
                         </svg>
                       </SvgTest>
                     </OptionRow>
                     </Link>
                 </>
                   ))}
               </OptionMenu>
             </>
           ) }
         
         </DropDownWrapper>
        )}
       
      </div>
    </DropDownWrapper>
    </>
  );
}

export default DropDownTitleMobile;

export const Content = styled.div`
  position: relative;
  height: 50px;
  right: -300px;
  top: 200px;
  background-color: blue;
  z-index: 40;
`;

const DropDownButtonMobile  = styled.div`

`
