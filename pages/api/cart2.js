import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Cart } from "@/models/Cart"; // Mongoose model
import { ObjectId } from "mongoose"; // Import ObjectId for handling MongoDB IDs


export default async function handler(req, res) {
  await mongooseConnect();

  if (authOptions) {
    const { user } = await getServerSession(req, res, authOptions);

    if (req.method === "POST") {
      const { productId } = req.body;
        try {
          // Check if the product already exists in the user's cart
          const existingCartItem = await Cart.findOne({ userEmail: user.email, product: productId });
      
          if (existingCartItem) {
            // If the product exists, increment the quantity
            existingCartItem.quantity = (existingCartItem.quantity || 1) + 1;
            await existingCartItem.save();
            res.status(200).json({ message: "Product quantity updated successfully." });
          } else {
            // If the product doesn't exist, create a new entry with quantity 1
            await Cart.create({ userEmail: user.email, product: productId, quantity: 1 });
            res.status(201).json({ message: "Cart item created successfully." });
          }
        } catch (error) {
          console.error("Error handling cart:", error);
          res.status(500).json({ error: "Failed to handle cart operation." });
        }
      }

  if (req.method === "PUT") {
    const { productId, quantity } = req.body;

    // Update the quantity of the product in the cart
    await Cart.updateOne(
      { userEmail: user.email, product: new ObjectId(productId) },
      { $inc: { quantity } }
    );
    return res.status(200).json({ message: "Quantity updated" });
  }
  

    if (req.method === "GET") {
      const updatedCart = await Cart.find({ userEmail: user.email }).populate(
        "product"
      );
      const clonedCart = JSON.parse(JSON.stringify(updatedCart));

  // Return the cloned cart as the JSON response
  res.status(200).json(clonedCart); 
    }

    if (req.method === "DELETE") {
      const { productId } = req.query;
    
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
      }
    
      const existingCartItem = await Cart.findOne({
        userEmail: user.email,
        product: productId,
      });
    
      if (!existingCartItem) {
        return res.status(404).json({ message: "Cart item not found." });
      }
    
      if (existingCartItem.quantity > 1) {
        // Decrement the quantity if it's greater than 1
        existingCartItem.quantity -= 1;
        existingCartItem.updatedAt = new Date(); // Update the timestamp
        await existingCartItem.save();
    
        res.status(200).json({
          message: "Product quantity decremented.",
          cart: existingCartItem,
        });
      } else {
        // Remove the product from the cart if quantity is 1
        await Cart.deleteOne({ _id: existingCartItem._id });
    
        res.status(200).json({ message: "Product removed from cart." });
      }
    }
    
    
  } else {
    return;
  }
}
