import Center from "@/components/Center";
import Footer from "@/components/Footer";
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
  categories,
  category,
  childCategory,
  products: originalProducts,
}) {
  const propertiesToFill = [];

  const maincat = categories.filter((c) => !c.parent);

  let selectCategory = maincat.find(({ _id }) => _id === category?.parent);
  const parentCat = maincat.filter(c => c._id === selectCategory._id)
  
  if (selectCategory) {
    propertiesToFill.push(...category?.properties);
    
   
  }
  console.log(category);
  console.log(parentCat);
  console.log(propertiesToFill)
  const propertyToFill = propertiesToFill.map((p) => ({
    name: p.name,
    value: "all",
  }));
  const defaultFilterValues = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }));

  const [sort, setSort] = useState("all");
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(
    selectCategory ? propertyToFill : defaultFilterValues
  );
  const [filtersChanged, setFiltersChanged] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }
  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    const catIds = [category._id, ...(childCategory?.map((c) => c._id) || [])];
    const params = new URLSearchParams();

    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/productsfilter?` + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [filtersValues, sort]);

  function handleChange(value) {
    setSort(value);
    setFiltersChanged(true);
  }

  return (
    <>
      <Header />
      <Center>
        <FilterContainer>
          <CategoryTitle>
            <Title>{category.name}</Title>
          </CategoryTitle>
          <FilterWrapper>
            {selectCategory && (
              <>
                {propertiesToFill.map((property) => (
                  <Filter key={property.name}>
                    <h1>{property.name}:</h1>
                    <select
                      onChange={(e) =>
                        handleFilterChange(property.name, e.target.value)
                      }
                      value={
                        filtersValues.find((f) => f.name == property.name).value
                      }
                    >
                      <option value="all">All</option>
                      {property.values.map((value, index) => (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </Filter>
                ))}
              </>
            )}
            <>
              {category.properties.map((property) => (
                <Filter key={property.name}>
                  <h1>{property.name}:</h1>
                  <select
                    onChange={(e) =>
                      handleFilterChange(property.name, e.target.value)
                    }
                    value={
                      filtersValues.find((f) => f.name == property.name).value
                    }
                  >
                    <option value="all">All</option>
                    {property.values.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </Filter>
              ))}
            </>

            <Filter>
              <h1>Sort by:</h1>
              <select onChange={(e) => handleChange(e.target.value)}>
                <option>Default</option>
                <option value="lowest">Low price</option>
                <option value="highest">High price</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </Filter>
          </FilterWrapper>
        </FilterContainer>

        <ProductGrid products={products}></ProductGrid>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find();
  const category = await Category.findById(context.query.id);
  //find child category
  const childCategory = await Category.find({ parent: category._id });

  const childIds = childCategory.map((c) => c._id);
  const catIds = [category._id, ...childIds];

  const products = await Product.find({ category: catIds });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      category: JSON.parse(JSON.stringify(category)),
      childCategory: JSON.parse(JSON.stringify(childCategory)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
