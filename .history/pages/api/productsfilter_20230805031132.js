import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, ...filters} = req.query;
 
    const productsQuery = {
      category:categories.split(','),
    };
    
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(filterName => {
        productsQuery['properties.'+filterName] = filters[filterName];
      })
   
      console.log(productsQuery)
    }
   

    res.json(await Product.find({category: '64ccaec3fdc5474281b0aadfs'}));
}