import React, { useState, useRef, useEffect } from "react";
import {
  DropDownWrapper,
  DropDownButton,
  SVG,
  OptionMenu,
  OptionRow,
  SvgTest,
  Label,
  SubDropDownWrapper,
  SubOptionMenu,
} from "./DropDownNew.styles";

import styled from "styled-components";
import Link from "next/link";

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
                  <OptionMenu
                    role="menu"
                    onMouseEnter={() => setActionDropDown(true)}
                    onMouseLeave={() => setActionDropDown(false)}
                  >
                    <Link href={`/store/`}>
                      <OptionRow>
                        <Label>{`All product`}</Label>

                        <SvgTest onClick={dropdown}>
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
                    {subCategory.map((option, index) => (
                      <>
                        <Link href={`/category/${option?._id}`}>
                          <OptionRow key={index}>
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
              )}
            </DropDownWrapper>
          )}
        </div>
      </DropDownWrapper>
      <SubDropDownWrapper>
        {actionDropDown && (
          <SubOptionMenu
            role="menu"
            onMouseEnter={() => setActionDropDown(true)}
            onMouseLeave={() => setActionDropDown(false)}
          >
            {subCategory.map((option, index) => (
              <>
                <Link href={`/category/${option?._id}`}>
                  <OptionRow key={index}>
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
          </SubOptionMenu>
        )}
      </SubDropDownWrapper>
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
