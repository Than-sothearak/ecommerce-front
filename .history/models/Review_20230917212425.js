import { Schema, model, models } from "mongoose";
const reviewSchema = new Schema({
    desciption: String,
    stars: Number,
}, {timestamps: true});

export const Review = models.Review || model('Review', reviewSchema);