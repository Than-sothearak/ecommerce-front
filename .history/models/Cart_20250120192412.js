import mongoose, {model, model, Schema} from "mongoose";

const CartSchema = new Schema({
    userEmail: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, ref: Product},
})

export const CartProduct = models?.CartProduct || model('CartProduct', CartSchema);