import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Products";
import axios from "axios";
import { json } from "micro";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CategoryTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: small;
`;
const Filter = styled.div`
  background-color: #eee;
  padding: 8px;
  border-radius: 5px;

  display: flex;
  h1 {
    font-weight: bold;
  }
  select {
    background-color: transparent;
  }
`;
export default function CategoryPage({
  category,
  childCategory,
  products: originalProducts,
}) {
  const [products, setProducts] = useState(originalProducts);
  const [filterValues, setFilterValues] = useState(
    category.properties.map((property) => ({
      name: property.name,
      value: "All",
    }))
  );

  function handleFilterChange(filterName, filterValue) {
    setFilterValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }
  useEffect(() => {
    const catIds = [category._id, ...(childCategory.map((c) => c._id) || [])];

    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    filterValues.forEach((f) => {
      params.set(f.name, f.value);
    });
    const url = `/api/productsfilter?` + params.toString();

    axios.get(url).then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <Header />
      <Center>
        <FilterContainer>
          <CategoryTitle>
            <Title>{category.name}</Title>
          </CategoryTitle>
          <FilterWrapper>
            {category.properties.map((property) => (
              <Filter key={property.name}>
                <h1>{property.name}:</h1>
                <select
                  onChange={(e) =>
                    handleFilterChange(property.name, e.target.value)
                  }
                >
                  value={" "}
                  {filterValues.find((f) => f.name == property.name).value}
                  <option value="all"></option>
                  {property.values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
          </FilterWrapper>
        </FilterContainer>

        <ProductGrid products={products}></ProductGrid>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const parentCategory = await Category.findById(context.query.id);
  //find child category
  const childCategory = await Category.find({ parent: parentCategory._id });
  const childIds = childCategory.map((c) => c._id);
  const catIds = [parentCategory._id, ...childIds];
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(parentCategory)),
      childCategory: JSON.parse(JSON.stringify(childCategory)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
