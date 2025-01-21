import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";


export default async function handler(req, res) {
  await mongooseConnect();
  if(authOptions) {
    const { user } = await getServerSession(req, res, authOptions);
  
    switch (req.method) {
      case "GET":
        try {
          const cart = await Cart.find();
          res.status(200).json(cart);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch cart products." });
        }
        break;
  
      case "POST":
        try {
          const { productId } = req.body;
          const newProduct = new Cart({ productId });
          await newProduct.save();
          const cart = await Cart.find();
          res.status(201).json(cart);
        } catch (error) {
          res.status(500).json({ error: "Failed to add product to cart." });
        }
        break;
  
      case "DELETE":
        try {
          await Cart.deleteMany();
          res.status(200).json([]);
        } catch (error) {
          res.status(500).json({ error: "Failed to clear cart." });
        }
        break;
  
      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    return
  }

}