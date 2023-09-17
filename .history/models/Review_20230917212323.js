import { Schema } from "mongoose";
const reviewSchema = new Schema({
    desciption: String,
    stars: Number,
}, {timestamps: true});