import Link from "next/link";
import styled from "styled-components";

export const DropDownWrapper = styled.div`
  position: relative;
`;

export const SubDropDownWrapper = styled.div`
  position: relative;
`;

export const DropDownButton = styled.button`
  display: flex;
  justify-content: start;
  gap: 10px;
  align-items: first baseline;
  width: 100%;
  background-color: white;
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));

  padding: 0.5rem;

  --tw-text-opacity: 1;
  color: black;

  /* Shadow */
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:focus {
    outline: none;
  }

  &:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
  }
`;

export const SVG = styled.svg`
  margin-left: 4px;
  height: 1rem;
  width: 1.2rem;
`;

export const OptionMenu = styled.div`
  transform-origin: top bottom;
  position: absolute;
  right: -40px;
  margin-right: -0.25rem;
  max-height: 16rem;
  overflow: scroll;
  z-index: 40;
 
  background-color: white;

  /* Shadow */
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  border-width: 0.5px;
  border-style: solid;
  border-radius: 0.375rem;
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));

  &:hover {
    outline: none;
  }
`;

export const OptionRow = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  background-color: white;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  width: 300px;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));

  &:hover {
    background-color: #73aed4;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

 
  /* Font */
  font-size: 0.875rem;
  line-height: 1.25rem;

  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
`;

export const SvgTest = styled.button`
  width: 30px;
  height: 40px;
  border: none;
  background-color: transparent;

  /* background-color: blue; */
`;
