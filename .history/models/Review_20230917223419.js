import mongoose, { model, Schema, models } from "mongoose";
const ReviewSchema = new Schema({
    description: String,
    stars: Number,
    product: {type:Schema.Types.ObjectId},
}, {timestamps: true});

export const Review = models?.Review || model('Review', ReviewSchema);