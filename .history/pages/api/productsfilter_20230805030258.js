import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, ...filters} = req.query;
    console.log(`this is filter ${{filters}}`)
    const productsQuery = {
      category:categories.split(','),
    };
    
    if (Object.keys(filters).length > 0) {
      const test = Object.keys(filters).forEach(filterName => {
        productsQuery['properties.'+filterName] = filters[filterName];
      })
      //  productsQuery.properties = filters;
    }
    console.log(test)

    res.json(await Product.find(productsQuery));
}