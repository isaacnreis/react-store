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

    const line_items = items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    console.log("🟢 Enviando para Stripe:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: "https://react-store-lyart.vercel.app/success",
      cancel_url: "https://react-store-lyart.vercel.app/error",
    });

    console.log("✅ Checkout criado:", session.id);

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("🔥 Erro no checkout:", error);
    return res.status(500).json({ error: error.message });
  }
}
