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
import { Review } from "@/models/Review";
import { useRouter } from "next/navigation";

export default function CategoryPage({
  category,
  childCategory,
  wishedProduct,
  reviews,
  products,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(0);
  const [productsFilter, setProductsFilter] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [url, setUrl] = useState('')
  const [filtersChanged, setFiltersChanged] = useState(false);

  const defaultFilterValues = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }));

  const propertiesToFill = category.properties.map((a) => {
    return a;
  });

  const [sort, setSort] = useState("all");
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  
  

  const onPageChange = (page) => {
    setCurrentPage(page);
    setFiltersChanged(true);
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
  }
  function handleReset() {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: "all",
      }));
    });
    setFiltersChanged(true);
    setCurrentPage(0);
  }

  useEffect(() => {
    const catName = [category._id, ...(childCategory?.map((c) => c._id) || [])];

    const params = new URLSearchParams();

    params.set("categories", catName.join(","));
    params.set("sort", sort);
    params.set("page", currentPage);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/productsfilter?` + params.toString();
    axios.get(url).then((res) => {
      setProductsFilter(res.data.products);
      setItems(res.data.pagination?.items);
      setPageSize(res.data.pagination?.itemPerPage)
    });
  }, [filtersValues, sort, currentPage, products]);

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
          propertiesToFill={[propertiesToFill]}
          items={items}
          currentPage={currentPage}
          products={filtersChanged ? productsFilter : products}
          pageSize={pageSize}
          wishedProduct={wishedProduct}
          categories={category}
          childCategory={childCategory}
          reviews={reviews}
        />
      </Center>
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

  const products = await Product.find({ category: catIds }).limit(9);

  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];
  const reviews = await Review.find({ product: products.map((p) => p) });
  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
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
  text-align: center;
  justify-content: center;
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
