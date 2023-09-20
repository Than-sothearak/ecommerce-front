import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res) {
    await mongooseConnect();
    
    if(authOptions) {
        if(req.method === 'POST') {
            const { user } = await getServerSession(req, res, authOptions);
            const info = await Review.findOne({ userEmail: user.email });
            const {description, stars, product} = req.body;
            const reviewDoc = await Review.create({description,stars,product})
            res.json(reviewDoc)
        }
    }
   

    if (req.method === 'GET') {
        const {product} = req.query;
        res.json(await Review.find({product}));
    }
}