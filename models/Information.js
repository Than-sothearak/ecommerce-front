import mongoose, { model, Schema, models } from "mongoose";

const InfomationSchema = new Schema({
  userEmail: {type:String, unique:true, required:true},
  name: { type: String, required: true },
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
})
export const Infomation = models.Infomation || model('Infomation',InfomationSchema)
