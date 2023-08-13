import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Infomation } from "@/models/Information";

export default async function handler(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    const info = await Infomation.findOne({ userEmail: user.email });
    if (info) {
      res.json(await Infomation.findByIdAndUpdate(info._id, req.body));
    } else {
      const profileDoc = await Infomation.create({
        userEmail: user.email,
        ...req.body,
      });
      res.json(profileDoc);
    }
  }

  if (req.method === "GET") {
    const { user } = await getServerSession(req, res, authOptions);
    const info = await Infomation.findOne({ userEmail: user.email });
    if (info) {
      res.json(await Infomation.findOne({ userEmail: user.email }));
    } else {
      return;
    }
  }
}
