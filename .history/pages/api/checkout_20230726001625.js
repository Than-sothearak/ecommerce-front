import { mongooseConnect } from "@/lib/mongoose";

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
}
const {
    name,  email, city,postalCode,streetAddress,country,products,
} = req.body;
await mongooseConnect()

const productIds = products.split(',');
const uniqueIds = [...new Set(productIds)];
const productsInfos = 