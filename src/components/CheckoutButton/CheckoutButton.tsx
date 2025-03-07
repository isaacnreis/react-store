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
      window.location.href = data.url;
    }
  };

  return (
    <button type="button" onClick={handleCheckout}>
      Pagar com Stripe
    </button>
  );
};

export default CheckoutButton;
