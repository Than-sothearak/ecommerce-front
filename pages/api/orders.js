import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();
  if (authOptions) {
    const { user } = await getServerSession(req, res, authOptions);
    if (req.method === "GET") {
      res.json(await Order.find({ userEmail: user.email }));
    }
  }
}
