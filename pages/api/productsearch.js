import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {phrases} = req.query;
    
    const productQuery = {};
    if (phrases) {
      productQuery['$or'] = [
        {title:{$regex:phrases,$options:'i'}},
        {desciption:{$regex:phrases,$options:'i'}}
      ]
    }
  
    res.json(await Product.find(productQuery,))
}