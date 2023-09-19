import { Schema, model, models } from "mongoose";
const reviewSchema = new Schema({
    desciption: String,
    stars: Number,
    product: {type:Schema.Types.ObjectId},
}, {timestamps: true});

export const Review = models.Review || model('Review', reviewSchema);