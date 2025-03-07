import Stripe from "stripe";
import { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("🟢 Nova requisição recebida!");

  if (req.method !== "POST") {
    console.error("❌ Método inválido:", req.method);
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      console.error("❌ Erro: Itens inválidos na requisição:", req.body);
      return res.status(400).json({ error: "Itens inválidos na requisição" });
    }

    const line_items = items.map((item) => {
      console.log("📦 Produto processado:", item);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    console.log("🟢 Enviando para Stripe:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    console.log("✅ Checkout criado:", session.id);

    return res.status(200).json({ id: session.id });
  } catch (error: any) {
    console.error("🔥 Erro no checkout:", error);
    return res.status(500).json({ error: error.message });
  }
}
