import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, sort, ...filters} = req.query;
    console.log(test)
    const [sortOrder] = sort.split();
    const productsQuery = {
      category:categories.split(','),
    };
    
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(filterName => {
        productsQuery['properties.'+filterName] = filters[filterName];
      })
   
    }
   
    res.json(await Product.find(
      productsQuery,
      null,
      {
        sort: {price:sortOrder === 'highest'? -1 : 1}
      })
      );
}