import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";
import { Category } from "@/models/Category";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import PcProductGrid from "@/components/PcProductGrid";
import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import { Review } from "@/models/Review";


const GamingPcs = ({
  childCategory,
  mainCategories,
  wishedProduct,
  reviews,
}) => {
  
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(1)
  const [filtersChanged, setFiltersChanged] = useState(false);

  const defaultFilterValues = mainCategories.map((a) =>
    a.properties.map((p) => ({
      name: p.name,
      value: "all",
    }))
  );
 
  const [sort, setSort] = useState("all");
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues[0]);

  const propertiesToFill = mainCategories.map((a) =>
    a.properties.map((p) => p)
  );
  ;
 
  const onPageChange = (page) => {
    setCurrentPage(page);
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
    setFiltersChanged(true)
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
      mainCategories[0]._id,
      ...(childCategory?.map((c) => c._id) || []),
    ];

    const params = new URLSearchParams();

    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    params.set('page', currentPage)
  
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
      const url = `/api/productsfilter?`+params.toString();
      await axios.get(url).then((res) => {
        setProducts(res.data.products);
        setItems(res.data.pagination?.items);
        setPageSize(res.data.pagination?.itemPerPage)
      });
  

  }

 

  useEffect(() => {
      fetchDataFilter();
  }, [filtersValues, sort, currentPage, filtersChanged]);

  return (
    <>
      <Center>
        <CategoryTitle>
          <Title>{mainCategories[0].name}</Title>
        </CategoryTitle>
      
        <PcProductGrid
          onPageChange={onPageChange}
          filtersValues={filtersValues}
          handleFilterChange={handleFilterChange}
          handleReset={handleReset}
          handleChange={handleChange}
          propertiesToFill={propertiesToFill}
          items={items}
          currentPage={currentPage}
          products={products}
          pageSize={pageSize}
          wishedProduct={wishedProduct}
          categories={mainCategories}
          childCategory={childCategory}
          reviews={reviews}
        />
      </Center>
    </>
  );
};

export default GamingPcs;
export async function getServerSideProps(context) {
  await mongooseConnect();
  
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => c.name === "Gaming Laptops");
  const productOfCategories = {};
  const allFetchProductId = [];
  const childCategory = await Category.find({ parent: mainCategories[0]._id });

  for (let mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();

    // get or filter all child category object
    const categoriesHaveParent = categories.filter(
      (c) => c?.parent?.toString() === mainCatId
    );

    // get the id of child category

    const childIds = categoriesHaveParent.map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childIds];

    const products = await Product.find({ category: categoriesIds }, null, {
      sort: { _id: -1 },
    });
    allFetchProductId.push(...products.map((p) => p._id.toString()));
    productOfCategories[mainCatId] = products;
  }

  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: allFetchProductId,
      })
    : [];
 
    const reviews = await Review.find({product:allFetchProductId.map(p => p)})

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      categories: JSON.parse(JSON.stringify(categories)),
      childCategory: JSON.parse(JSON.stringify(childCategory)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      productOfCategoriess: JSON.parse(JSON.stringify(productOfCategories)),
      wishedProduct: wishedProduct.map((i) => i.product.toString()),
    },
  };
}

const CategoryTitle = styled.div`
  margin-top: 40px;
  text-align: center;
  margin-bottom: 0;
  align-items: center;
`;