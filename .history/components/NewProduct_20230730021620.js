import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";
import { useState, useEffect } from "react";


const Title = styled.h2`
font-size: 2rem;
margin: 30px 0 10px;
font-weight: normal;`


const NewProduct = ({ newProduct }) => {
  const [getProduct, setGetProduct] = useState([]);
  
  useEffect(()=> {
    setGetProduct(newProduct);
  }, [newProduct])
  
  return (
    <Center>
      <Title>New arrivals</Title>
   
    </Center>
  );
};

export default NewProduct;
