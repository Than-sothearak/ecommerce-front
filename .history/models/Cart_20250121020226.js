import mongoose, {model, models, Schema} from "mongoose";

const CartSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export const Cart = models?.Cart || model("Cart", CartSchema);
