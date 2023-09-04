import React from "react";
import { styled } from "styled-components";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  
    const pagesCount = Math.ceil(items / pageSize); 

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <NextPage>
    
        {pages.map(page => (
            <li 
            key={page}
            className={page === currentPage ? 'text-red-600 p-1 bg-black rounded-md' : 'text-black'}
            >
                <a
                onClick={() => onPageChange(page)}
                >{page}</a>
            </li>
        ))}
     
    </NextPage>
  );
};

export default Pagination;

const NextPage = styled.ul`
  cursor: pointer;
  margin: 5px 0;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 8px 20px;
  gap: 10px;
  font-size: 12px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
    padding: 8px 20px;
  }
`;
const TextButton = styled.div`
  display: flex;

  justify-items: center;
  text-align: center;
`;
