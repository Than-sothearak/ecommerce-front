import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";


export default async function handler(req, res) {
  await mongooseConnect();
  if(authOptions) {
    const { user } = await getServerSession(req, res, authOptions);
  
    if (req.method === 'POST') {
      const {product} = req.body;
  
      const wishedDoc = await WishedProduct.findOne({userEmail:user.email,product});
      if (wishedDoc) {
        await WishedProduct.findByIdAndDelete(wishedDoc._id);
        res.json({wishedDoc});
       
      } else {
        console.log(product)
        await WishedProduct.create({userEmail:user.email,product});
        res.json('created');
      }
    }
  
    if (req.method === 'GET') {
      res.json(
        await WishedProduct.find({userEmail:user.email}).populate('product')
      );
    }
  } else {
    return
  }

}