import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler (req, res) {
    await mongooseConnect();
    
    if(authOptions) {
        if(req.method === 'POST') {
            const {description, stars, product} = req.body;
            const { user } = await getServerSession(req, res, authOptions);
            const info = await Review.findOne({ userEmail: user.email });
            if (info) {
                res.json(await Review.findByIdAndUpdate(info._id, req.body));
            } else {
                const reviewDoc = await Review.create({description,stars,product})
            res.json(reviewDoc)
            }
        }
    }
   
    if (req.method === 'GET') {
        const {product} = req.query;
        res.json(await Review.find({product}));
    }
}