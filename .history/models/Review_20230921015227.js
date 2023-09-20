import mongoose, { model, Schema, models } from "mongoose";
const ReviewSchema = new Schema({
    userEmail: {type: String, required: true},
    userName: {type: String, required: true},
    description: String,
    stars: Number,
    product: {type:Schema.Types.ObjectId},
}, {timestamps: true});

export const Review = models?.Review || model('Review', ReviewSchema);