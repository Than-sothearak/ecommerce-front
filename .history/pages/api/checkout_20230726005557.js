import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
    const {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
        products,
    } = req.body;
    
    
    const productsIds = products.split(',');
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});
    
    let line_items = [];
    for (const productId of uniqueIds) {
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productsInfos ) {
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
}

