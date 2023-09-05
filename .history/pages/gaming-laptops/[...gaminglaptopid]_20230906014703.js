import Center from "@/components/Center";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getServerSession } from "next-auth";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "../api/auth/[...nextauth]";
import PcProductGrid from "@/components/PcProductGrid";


export default function LaptopPage({
  categories,
  category,
  childCategory,
  wishedProduct,
  products: originalProducts,
}) 
{
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(1)
  const [filtersChanged, setFiltersChanged] = useState(false);

  //  const categor = Object.keys(category)
  // const defaultFilterValues = category[3].map((p) => ({
  //     name: p.name,
  //     value: "all",
  //   }))
  ;

 const propertyToFill = category.properties.map(p => {
  return p;
 })
 const defaultFilterValues = propertyToFill.map(p => ({
  name: p.name,
  value: 'all'
 }))


  const [sort, setSort] = useState("all");
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  
  const fetchData = async () => {

    await axios.get("/api/paginationlaptops?page=" + currentPage).then((res) => {
      setProducts(res.data.products);
      setItems(res.data.pagination?.items);
      setPageSize(res.data.pagination?.itemPerPage)
    });
  };
 
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

  function handleChange(value) {
    setSort(value);
    setFiltersChanged(true);
    fetchDataFilter();
  }
  function handleReset() {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: "all",
      }));
    });
    setFiltersChanged(false);
    setCurrentPage(0)
  }
  const fetchDataFilter = async  () => {
    const catIds = [
      categories._id,
      ...(childCategory?.map((c) => c._id) || []),
    ];

    const params = new URLSearchParams();

    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
      const url = `/api/productsfilter?`+params.toString();
    await axios.get(url).then((res) => {
        setProducts(res.data.products);
        setItems(res.data.pagination?.items);
      });
  }

  useEffect(() => {
   
   if(!filtersChanged) {
    fetchData();
   }else {
    fetchDataFilter();
   }
  }, [filtersValues, sort, currentPage]);
  
  return (
    <>
      <Center>
        <CategoryTitle>
          <Title>{category.name}</Title>
        </CategoryTitle>
      
        <PcProductGrid
          onPageChange={onPageChange}
          filtersValues={filtersValues}
          handleFilterChange={handleFilterChange}
          handleReset={handleReset}
          handleChange={handleChange}
          propertiesToFill={defaultFilterValues}
          items={items}
          currentPage={currentPage}
          products={products}
          pageSize={pageSize}
          wishedProduct={wishedProduct}
          categories={category}
          childCategory={childCategory}
        />
      </Center>
    </>
  );
};


  
export async function getServerSideProps(context) {
  await mongooseConnect();
  const categories = await Category.find();
  const category = await Category.findById(context.query.gaminglaptopid);

  //find child category
  const childCategory = await Category.find({ parent: category._id });

  const childIds = childCategory.map((c) => c._id);
  const catIds = [category._id, ...childIds];

  const products = await Product.find({ category: catIds });

  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      category: JSON.parse(JSON.stringify(category)),
      childCategory: JSON.parse(JSON.stringify(childCategory)),
      products: JSON.parse(JSON.stringify(products)),
      wishedProduct: wishedProduct.map((i) => i.product.toString()),
    },
  };
}

const CategoryTitle = styled.div`
  margin-top: 14px;
  margin-bottom: 0;
  align-items: center;
`;
const FilterContainer = styled.div`
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
  z-index: -1;
  select {
    width: 280px;
  }
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