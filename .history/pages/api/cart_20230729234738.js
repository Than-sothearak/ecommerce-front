import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";


export default async function handeler(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Product.find({title:ids}));
}