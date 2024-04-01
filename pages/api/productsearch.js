import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product";

export default async function handler (req, res) {
    await mongooseConnect();
    const {phrase} = req.query;
    
    const productQuery = {};
    if (phrase) {
      productQuery['$or'] = [
        {title:{$regex:phrase,$options:'i'}, status: 1},
        {desciption:{$regex:phrase,$options:'i'}, status: 1},
       
      ]
    }
  
    res.json(await Product.find(productQuery,))
}