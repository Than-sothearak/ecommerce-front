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
   

    res.json(await Product.find({category: ['64c8b6e650ef8e6c1ee74d32', '64ccafdbfdc5474281b0ab38'],'properties.Storage': '128GB','properties.Color': 'pink' },));
}