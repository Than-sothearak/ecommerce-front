import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    const categories = await Category.find();
    const mainCategories = categories.filter((c) => c.name === 'Gaming PCs');

    const allFetchProductId = [];
    const productQuery = {};
    
    const page = req.query.page || 0;
    const itemPerPage = 10;
    
    for (let mainCat of mainCategories) {
      const mainCatId = mainCat._id.toString();
      // get or filter all child category object
      const categoriesHaveParent = categories.filter(
        (c) => c?.parent?.toString() === mainCatId
      );
      // get the id of child category
      const childIds = categoriesHaveParent.map((c) => c._id.toString());
      const categoriesIds = [mainCatId, ...childIds];
      
      const products = await Product.find({ category: categoriesIds }, null, {
        sort: { _id: -1 },
      });
      allFetchProductId.push(...products.map(p => p._id.toString()))
      productQuery[mainCatId] = products;
   
    }
      const count = await Product.estimatedDocumentCount(productQuery);
  
      const countPage = count / itemPerPage;
      const items = await Product.find({}, null, { sort: { _id: -1 } })
        .skip(page * itemPerPage)
        .limit(itemPerPage);
      res.json({ pagination: { count, countPage }, items });
  
  }
}
