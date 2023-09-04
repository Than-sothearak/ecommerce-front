import { styled } from "styled-components";
import { RevealWrapper } from "next-reveal";
import PcBox from "./PcBox";
import { grayBorder } from "@/lib/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { paginate } from "@/helper/paginate";


export default function PcProductGrid({
  products: originalProducts,
  wishedProduct = [],
  categories,
  childCategory,
  pageSize,
  items,
  currentPage: originalCurrentPage,
  filtersChanged:currentFiltersChanged,
}) {

  const defaultFilterValues = categories.map((a) =>
    a.properties.map((p) => ({
      name: p.name,
      value: "all",
    }))
  );
 
  const [getProducts, setGetProducts] = useState(originalProducts);
  const [sort, setSort] = useState("all");
  const [filtersChanged, setFiltersChanged] = useState(currentFiltersChanged);
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues[0]);
  const [currentPage, setCurrentPage] = useState(originalCurrentPage);
  const propertiesToFill = categories.map((a) => a.properties.map((p) => p));
  
  const onPageChange = (page) => {
    setCurrentPage(page);
    setFiltersChanged(true)
  };

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
    const catIds = [categories[0]._id, ...(childCategory?.map((c) => c._id) || [])];
  
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
      setGetProducts(res.data);
    });
  }, [filtersValues, sort, currentPage]);
  
  const paginatedProducts = paginate(getProducts, currentPage, pageSize);

  function handleChange(value) {
    setSort(value);
    setFiltersChanged(true);
  }
  function handleReset () {
    setFiltersValues(prev => {
      return prev.map(p => ({
        name: p.name,
        value: 'all'
      }));
    });
  }
  
  return (
    <Container>
      <FilterWrapper>
        <FilterHeader>
          <h1>Filter</h1>
          <button onClick={handleReset}>Reset All</button>
        </FilterHeader>
        <FilterInput>
          {propertiesToFill[0].map((property) => (
            <Filter key={property.name}>
              <FilterTitle>
                <h1>{property.name}:</h1>
              </FilterTitle>
              <select
                onChange={(e) =>
                  handleFilterChange(property.name, e.target.value)
                }
                value={
                  filtersValues?.find((f) => f.name == property?.name).value
                }
              >
                <option value="all"></option>
                {property.values.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </Filter>
          ))}
        </FilterInput>
      </FilterWrapper>
      <ProductContainer>
        <SortFilter>
          <SortBy>
            <h1>Sort by:</h1>
            <select onChange={(e) => handleChange(e.target.value)}>
              <option value="all">Default</option>
              <option value="lowest">Low price</option>
              <option value="highest">High price</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </SortBy>
          <Pagination 
             items={items.length} 
             currentPage={currentPage} 
             pageSize={pageSize} 
             onPageChange={onPageChange}
          />
         
        </SortFilter>
        <StyledProductGrid>
          {paginatedProducts?.length > 0 &&
            paginatedProducts.map((product, index) => (
              <RevealWrapper
                key={product._id}
                delay={50 * index}
                duration={1000}
              >
                <PcBox
                  {...product}
                  wished={wishedProduct.includes(product._id)}
                />
              </RevealWrapper>
            ))}
        </StyledProductGrid>
      </ProductContainer>
    </Container>
  );
}
const SortBy = styled.div`
display: flex;
gap: 10px;
align-items: center;
border: 1px solid ${grayBorder};
margin: 10px 0;
padding: 5px 10px;
font-size: 14px;
border-radius: 20px;
`
const FilterHeader = styled.div`
font-size: 14px;
display: flex;
margin-left: 5px;
margin-right: 5px;
margin-bottom: 10px;
padding-bottom: 10px;
border-bottom: 1px solid ${grayBorder};
justify-content: space-between;
h1 {
  font-size: 14px;
  font-weight: bold;
}
button {
  text-decoration: underline;
}
`
const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  transition: visibility 1s linear;
  @media screen and (max-width: 280px) {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 1240px) {
    grid-template-columns: 0.2fr 1fr;
  }
  gap: 30px;
  margin: 40px 0;
`;
const FilterWrapper = styled.div`
  border: 1px solid ${grayBorder};
  border-radius: 20px;
  height: 100%;
  padding: 10px;
   @media screen and (min-width: 768px) {
     height: 50%;
  }
  `;
const FilterInput = styled.div`
  background-color: white;
  gap: 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }
`;
const ProductContainer = styled.div``;
const SortFilter = styled.div`
  display: flex;
  justify-content: end;
  border: 1px solid #b2b1b1;
  border-radius: 20px;
`;
const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 10px;
  align-items: center;
  background-color: white;
  margin: 5px 5px;
  border-bottom: 1px solid ${grayBorder};
  
  font-size: 13px;
  select {
    font-size: 12px;
  }
  @media screen and (min-width: 768px) {
  }
  select {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
  }
  @media screen and (min-width: 768px) {
    select {
      width: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-line;
    }
  }
`;
const FilterTitle = styled.div`
  width: 80px;
  h1 {
    font-size: 12px;
    font-weight: bold;
    width: 300px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media screen and (min-width: 768px) {
    h1 {
      width: 100px;
    }
  }
`;


