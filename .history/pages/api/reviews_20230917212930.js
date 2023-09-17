import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handler (req, res) {
    await mongooseConnect();

    if(req.method === 'POST') {
        const {description, stars} = req.body;
        const reviewDoc = await Review.create({description,stars})
        res,json(reviewDoc)
    }
}