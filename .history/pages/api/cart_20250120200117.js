import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Cart from "@/models/Cart"; // Mongoose model


export default async function handler(req, res) {
  await mongooseConnect();
  if(authOptions) {
    const { user } = await getServerSession(req, res, authOptions);
  
    if (req.method === 'POST') {
      const {productId} = req.body;

      await Cart.create({userEmail:user.email, productId});
              res.json('created');

    }
  } else {
    return
  }

}