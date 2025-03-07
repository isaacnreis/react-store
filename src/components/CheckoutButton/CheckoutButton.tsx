import { useCartStore } from "../../store/cartStore";

const CheckoutButton = () => {
  const { cart } = useCartStore();

  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
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
    });

    const data = await response.json();
    if (data.url) {
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
