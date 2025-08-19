import React, { useState, useRef, useEffect } from "react";
import {
  DropDownWrapper,
  DropDownButton,
  SVG,
} from "./DropDownNew.styles";

import styled from "styled-components";
import Navbar from "./Navbar2";

function DropDownTitle({ defaultText = "Categories", options, subCategory }) {
  const [actionDropDown, setActionDropDown] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const dropdownEl = useRef(null);
  const [mainDefaultText, setMainDefaultText] = useState();

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
      <DropDownWrapper>
        <div ref={dropdownEl}>
          <DropDownButton onClick={dropdown}>
            {defaultText}
            <SVG>
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
          </DropDownButton>

          {options && (
            <DropDownWrapper>
              {actionDropDown && (
                <>
                  <Navbar options={options} />
                </>
              )}
            </DropDownWrapper>
          )}
        </div>
      </DropDownWrapper>
      
    </>
  );
}

export default DropDownTitle;

export const Content = styled.div`
  position: relative;
  height: 50px;
  right: -300px;
  top: 200px;
  background-color: blue;
  z-index: 40;
`;
