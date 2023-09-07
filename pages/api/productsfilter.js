import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, sort, page, ...filtersValues} = req.query;
    const [sortOrder] = sort.split();
    const productsQuery = {
      category:categories.split(','),
    };
    
    if (Object.keys(filtersValues).length > 0) {
      Object.keys(filtersValues).forEach(filterName => {
        productsQuery['properties.'+filterName] = filtersValues[filterName];
      })
   
    }
  
    const itemPerPage = 9;
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
    

      const items = products.length
    
      const countPage = products.length / itemPerPage;
      
      res.json({
        pagination: { items, countPage, itemPerPage },
        products,
      });
}