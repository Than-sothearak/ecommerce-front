import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Address";

export default async function handler (req, res) {
    await mongooseConnect();
    const {phrase} = req.query;
    
    const productQuery = {};
    if (phrase) {
      productQuery['$or'] = [
        {title:{$regex:phrase,$options:'i'}},
        {desciption:{$regex:phrase,$options:'i'}}
      ]
    }
    res.json(await Product.find(productQuery,))
}