import { useCartStore } from "../../store/cartStore";

const CheckoutButton = () => {
  const { cart } = useCartStore();

  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cart }),
    });

    const data = await response.json();
    if (data.id) {
      window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
    }
  };

  return <button onClick={handleCheckout}>Pagar com Stripe</button>;
};

export default CheckoutButton;
