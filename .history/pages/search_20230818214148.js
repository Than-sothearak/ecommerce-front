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

export default function SearchPage() {
  const {inputs} = useContext(CartContext)
  const [products, setProducts] = useState([]);
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