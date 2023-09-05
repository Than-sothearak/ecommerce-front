import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();
  const { categoriesName, sort, ...filters } = req.query;
 
  const [sortOrder] = sort.split();
  const productsQuery = {
    categories: categoriesName.split(","),
  };

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach(filterName => {
      productsQuery['properties.'+filterName] = filters[filterName];
    })
 
    
  }
  console.log(categories.split(","))
 
  let sorted;
  if (sortOrder === "highest" || sortOrder === "lowest") {
    sorted = { price: sortOrder === "highest" ? -1 : 1 };
  } else {
    sorted = { _id: sortOrder === "newest" ? -1 : 1 };
  }
  res.json(await Product.find(productsQuery, null, { sort: sorted }));
}
