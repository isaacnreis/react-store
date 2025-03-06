import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "../../store/cartStore";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CheckoutButton() {
  const { cart } = useCartStore();

  const handleCheckout = async () => {
    const response = await fetch(
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        }),
      }
    );

    const { id } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <button type="button" onClick={handleCheckout}>
      Pagar com Stripe
    </button>
  );
}
