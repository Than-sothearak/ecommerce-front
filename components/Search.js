import React from 'react'
import styled from "styled-components";
import Link from "next/link";
import {BiSearchAlt2} from "react-icons/bi";

const SearchBox = styled.div`

   width: 100%;
   display: flex;
   justify-content: space-between;
`
const SearchInput = styled.input`
width: 100%;
  outline: none;
  color: black;
  background: transparent;
  padding: 0 10px;
 
`;

const SearchIcon = styled(Link)`
width: 30px;
height: auto;
color: gray;
`

const Search = ({handleChange, search}) => {

  return (
    <>
       <SearchBox>
            <SearchInput
            autoFocus 
            onChange={handleChange}
            type="text" 
            id="fname" 
            name="fname" 
            placeholder="Search product..."></SearchInput>
            <SearchIcon
            onClick={search}
            href="/search/" 
            title='Search'>
              <BiSearchAlt2 className="text-black text-2xl" />
            </SearchIcon>
            </SearchBox>
    </>
  )
}

export default Search