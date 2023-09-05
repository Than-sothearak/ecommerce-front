export default async function handler(req, res) {
  await mongooseConnect();
  const { categories, sort, ...filters } = req.query;

  const [sortOrder] = sort.split();
  const productsQuery = {
    category: categories.split(","),
  };
  let sorted;
  if (sortOrder === "highest" || sortOrder === "lowest") {
    sorted = { price: sortOrder === "highest" ? -1 : 1 };
  } else {
    sorted = { _id: sortOrder === "newest" ? -1 : 1 };
  }
  res.json(await Product.find(productsQuery, null, { sort: sorted }));
}
