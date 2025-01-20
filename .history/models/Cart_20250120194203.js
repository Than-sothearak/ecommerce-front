import mongoose, {model, models, Schema} from "mongoose";
import { Product } from "./Product";

const CartSchema = new Schema({
    userEmail: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, ref: Product},
})

export const Cart = models?.Cart || model('Cart', CartSchema);