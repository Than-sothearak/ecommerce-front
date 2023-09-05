import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  const allFetchProductId = [];
  const productQuery = {};
  const page = req.query.page || 0;
  const itemPerPage = 10;

  if (method === "GET") {
    const categories = await Category.find();
    const mainCategories = categories.filter((c) => c.name === "Gaming PCs");
    for (let mainCat of mainCategories) {
      const mainCatId = mainCat._id.toString();

      // get or filter all child category object
      const categoriesHaveParent = categories.filter(
        (c) => c?.parent?.toString() === mainCatId
      );

      // // get the id of child category
      const childIds = categoriesHaveParent.map((c) => c._id.toString());
      const categoriesIds = [mainCatId, ...childIds];

      const product = await Product.find({ category: categoriesIds }, null, {
        sort: { _id: -1 },
      })
        .skip(page * itemPerPage)
        .limit(itemPerPage);

      allFetchProductId.push(...product.map((p) => p._id.toString()));
      productQuery[mainCatId] = product;

      const propertyValues = Object.values(productQuery);
      const products = propertyValues[0];

      const productItems = await Product.find({ category: categoriesIds });
      const items = productItems.length;
      const countPage = products.length / itemPerPage;

      res.json({
        pagination: { items, countPage, itemPerPage },
        products,
      });
    }
  }
}
