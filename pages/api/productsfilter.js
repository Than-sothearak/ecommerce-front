import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, sort, ...filters} = req.query;
    const [sortOrder] = sort.split();
    const productsQuery = {
      category:categories.split(','),
    };
    
    
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(filterName => {
        productsQuery['properties.'+filterName] = filters[filterName];
      })
   
    }
    const page = req.query.page || 0;
    const itemPerPage = 10;
    let sorted
    if (sortOrder === 'highest' || sortOrder === 'lowest') { 
        sorted =  {price:sortOrder === 'highest' ? -1 : 1}
    } else {
        sorted = {_id:sortOrder === 'newest' ? -1 : 1}
    }
    const productItems = await Product.find(
      productsQuery,
      null,
      {sort: sorted},
      )
    const products = await Product.find(
      productsQuery,
      null,
      {sort: sorted},
      ).skip(page * itemPerPage)
      .limit(itemPerPage);
    

      const items = productItems.length
    
      const countPage = products.length / itemPerPage;
      
      res.json({
        pagination: { items, countPage }, products
      })
}