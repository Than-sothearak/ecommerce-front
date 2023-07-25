import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

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
console.log(products)
const productIds = products.split(',');
const uniqueIds = [...new Set(productIds)];
const productsInfos = await Product.find({_id:uniqueIds});

let line_items = [];
for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toSting() == productId);
    const quantity = products.filter(id => id == productId)?.length || 0;
    if (quantity > 0 && productInfo ) {
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: {name: productId.name},
            unit_amount: quantity * productId.price,
          }
          
        });
    }
}