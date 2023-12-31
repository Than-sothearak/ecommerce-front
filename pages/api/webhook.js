
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";
import { mongooseConnect } from '@/lib/mongoose';


const endpointSecret = "whsec_ad76dc1aba205c6a637903dae44bc99b79c50631e0a3db1eac9c55e9b31b5647'";

export default async function handeler (req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];
 
  let event; 

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      console.log({data})
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}


export const config = {
  api: {bodyParser:false,}
};

