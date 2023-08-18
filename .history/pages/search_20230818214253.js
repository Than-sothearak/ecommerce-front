import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import { useState } from "react";
import axios from "axios";
import ProductGrid from "@/components/ProductGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

const StyledHeader = styled.header`
  letter-spacing: 0.5px;
  background-color: #222;
`;
const Logo = styled(Link)`
  ${(props) =>
    props.mobilenavactive
      ? `
    display: none;

  `
      : `
    display: flex;
  `}
  align-items: center;
  color: #fff;
  text-decoration: none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobilenavactive
      ? `
    display: absolute;
  `
      : `
    display: none;
  `}
  width: 100%;
  align-items: center;
  position: relative;
  bottom: 0;
  gap: 20px;
  right: 10px;
  padding: 50px 20px 20px;
  @media screen and (min-width: 768px) {
    right: 10px;
  }
  @media screen and (min-width: 1024px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 10px 0;

  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 4;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const NavAccountBox = styled.div`
  ${(props) =>
    props.mobilenavactive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  position: relative;
  bottom: 0;
  right: 100px;
  padding: 50px 20px 20px;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavCart = styled(Link)`
  padding: 14px 15px;
  border-radius: 30px;
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
`;
const NavAcc = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;

  @media screen and (min-width: 640px) {
    padding: 14px 15px;
    border-radius: 30px;
    height: 54px;
    color: white;
    background-color: transparent;
    display: flex;
    gap: 10px;
    align-items: center;
    &:hover {
      background-color: #096fd3;
    }
  }
`;
const CartNum = styled.p`
  font-size: smaller;
  text-align: center;
  background-color: #ffa502;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: absolute;
  left: 28px;
  bottom: 28px;
`;
const SearchbarBox = styled.div`
  ${(props) =>
    props.mobilenavactive
      ? `
    display: none;
  `
      : `
    display: flex;
  `}
  background-color: white;
  align-items: center;
  margin: 0 20px 0 20px;
  width: 100%;
  color: white;
  font-size: small;
  font-weight: normal;
  z-index: 3;
  height: 40px;
  border-radius: 40px;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SearchInput = styled.input`
  margin-left: 20px;
  width: 100%;
  outline: none;
  color: black;
  background: transparent;
  padding: 0 10px;
`;

const SearchIcon = styled.div`
  width: 30px;
  height: auto;
  color: gray;
  cursor: pointer;
`;



export default function SearchPage() {
  const {inputs} = useContext(CartContext)
  const [products, setProducts] = useState([]);
  console.log(encodeURIComponent(inputs))
  function search() {
    if (inputs.length > 2) {
      axios
        .get("/api/productsearch?phrase=" + encodeURIComponent(inputs))
        .then((res) => {
          setProducts(res.data);
        });
    } else if (inputs.length === 0) {
      setProducts([]);
    }
  }
  useEffect(() => {
    search();
  }, [inputs]);

  return (
    <>
  

      <Center>
        <div>
          <h1 className="mt-5 text-gray">{`Result query:(${products.length})`}</h1>
          <ProductGrid products={products} />
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect()
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });


  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}