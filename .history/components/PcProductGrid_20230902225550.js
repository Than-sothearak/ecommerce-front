import { styled } from "styled-components";
import { RevealWrapper } from "next-reveal";
import PcBox from "./PcBox";
import { grayBorder } from "@/lib/colors";
import { useEffect, useState } from "react";

export default function PcProductGrid({ products:originalProducts, wishedProduct = [] }) {
 
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [sort, setSort] = useState("all");
  const [products, setProducts] = useState(originalProducts);
  
 
  function handleChange(value) {
    setSort(value);
    setFiltersChanged(true);
  }

  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    const params = new URLSearchParams();
    params.set("sort", sort);

    const url = `/api/productsfilter?` + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [ sort]);
 
  return (
    <Container>
    <FilterWrapper>
      <div>sdsds</div>
      <div>sdsds</div>
      <div>sdsds</div>
    </FilterWrapper>
    <ProductContainer>
      <SortFilter>
    

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
       
        <NextPage>
          <button>{`<<`}</button>
          <TextButton>
            <h1>Page 1 of 3</h1>
          </TextButton>
          <button>{`>>`}</button>
        </NextPage>
      </SortFilter>
    <StyledProductGrid>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper
            key={product._id}
            delay={50*index}
            duration={1000}
          >
            <PcBox  product={product}
            wished={wishedProduct.includes(product._id)}/>
          </RevealWrapper>
        ))}
    </StyledProductGrid>
    </ProductContainer>
    </Container>
  );
}


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
    grid-template-columns: 0.4fr 2fr;
  }
  gap: 30px;
  margin: 40px 0;
`
const FilterWrapper = styled.div`
background-color: white;
border: 1px solid ${grayBorder};
border-radius: 20px;
padding: 20px;

`
const ProductContainer = styled.div`
`
const SortFilter = styled.div`
 display: flex;
 justify-content: end;
 border: 1px solid #B2B1B1 ;
 border-radius: 20px;
`
const Filter = styled.div`
display: flex;
align-items: center;
background-color: white;
padding: 8px 10px;
margin: 5px 0;
border: 1px solid ${grayBorder};
border-radius: 15px;
font-size: 13px;
@media screen and (min-width: 768px) {
    font-size: 14px;
    padding: 8px 20px;
  }
`
const NextPage = styled.div`
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
`
const TextButton = styled.div`
display: flex;

justify-items: center;
text-align: center;
`