import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Cart } from "@/models/Cart"; // Mongoose model

export default async function handler(req, res) {
  await mongooseConnect();

  if (authOptions) {
    const { user } = await getServerSession(req, res, authOptions);

    if (req.method === "POST") {
      const { productId } = req.body;

      await Cart.create({ userEmail: user.email, product: productId });
      res.status(201).json({ message: "Cart item created successfully." });
    }

    if (req.method === "GET") {
      const updatedCart = await Cart.find({ userEmail: user.email }).populate(
        "product"
      );
      res.status(201).json(updatedCart); // Return updated cart
    }

    if (req.method === "DELETE") {
      const { productId } = req.query;

      if (productId) {
        // Remove a specific product
        await Cart.deleteOne({ userEmail: user.email, product: productId });
        const updatedCart = await Cart.find({ userEmail: user.email }).populate(
          "product"
        );
        res.status(200).json(updatedCart); // Return updated cart
      } else {
        // Remove all products from the cart
        await Cart.deleteMany({ userEmail: user.email });
        res.status(200).json({ message: "Cart cleared successfully." });
      }
    }
  } else {
    return;
  }
}
