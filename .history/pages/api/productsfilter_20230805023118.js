import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, ...filters} = req.body;
    const productsQuery = {
      category: categories.split(','),
    };
    if (Object.keys(filters).length > 0) {
       productsQuery.properties = filters;
    }
    console.log(productsQuery);
    res.json(await Product.find(productsQuery));
}