import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {categories, ...filters} = req.body;
    console.log(filters)
    res.json( await Product.find({category:categories.spilt(',')}));
}