import { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    type CartItem = {
      title: string;
      image: string;
      price: number;
      quantity: number;
    };

    const line_items = cartItems.map((item: CartItem) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.VERCEL_URL}/success`,
      cancel_url: `${process.env.VERCEL_URL}/cart`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Erro no Stripe:", error);
    res.status(500).json({ error: "Erro ao criar sessão de pagamento" });
  }
}
