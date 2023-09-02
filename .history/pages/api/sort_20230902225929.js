import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Products";

export default async function handler (req, res) {
    await mongooseConnect();
    const {sort, ...filters} = req.query;
    const [sortOrder] = sort.split();
  
    let sorted
    if (sortOrder === 'highest' || sortOrder === 'lowest') { 
        sorted =  {price:sortOrder === 'highest' ? -1 : 1}
    } else {
        sorted = {_id:sortOrder === 'newest' ? -1 : 1}
    }
    res.json(await Product.find(
      null,
      {sort: sorted},
      )
      );
}