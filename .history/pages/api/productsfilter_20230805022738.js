import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Products";

export default async function handle(req, res) {
  await mongooseConnect();
  const {categories,  ...filters} = req.query;
  console.log({filters})
  const productsQuery = {};
  if (categories) {
    productsQuery.category = categories.split(',');
  }

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach(filterName => {
      productsQuery['properties.'+filterName] = filters[filterName];
    });
  }
  console.log(productsQuery);
  res.json(await Product.find(
    productsQuery,
    null,
    {
      sort:{[sortField]:sortOrder==='asc' ? 1 : -1}
    })
  );
}