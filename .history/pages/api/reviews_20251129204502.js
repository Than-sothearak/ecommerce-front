import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

function maskEmail(email) {
  if (!email) return "";
  const [name, domain] = email.split("@");
  return `${name[0]}***@${domain}`;
}

export default async function handler(req, res) {
  await mongooseConnect();

  // --- POST: Create or Update Review ---
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { description, stars, product, date } = req.body;
    const user = session.user;

    const existing = await Review.findOne({
      userEmail: user.email,
      product: product,
    });

    if (existing) {
      const updated = await Review.findByIdAndUpdate(existing._id, req.body, {
        new: true,
      });
      return res.json(updated);
    }

    const created = await Review.create({
      userEmail: user.email,
      userName: user.name,
      description,
      stars,
      date,
      product,
    });

    return res.json(created);
  }

  // --- GET: Fetch Masked Reviews ---
  if (req.method === "GET") {
    const { product } = req.query;
    const reviews = await Review.find({ product });

    // Mask emails here
    const sanitized = reviews.map((r) => ({
      ...r._doc,
      userEmail: maskEmail(r.userEmail),
    }));

    return res.json(sanitized);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
