import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Cart.module.scss";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartPage}>
      <h2>🛒 Seu Carrinho</h2>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>O carrinho está vazio.</p>
          <Link to="/" className={styles.backToShop}>
            Voltar para a Loja
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} />
                <div className={styles.details}>
                  <h3>{item.title}</h3>
                  <p>R$ {item.price.toFixed(2)}</p>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.cartFooter}>
            <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className={styles.checkoutButton}>
                Finalizar Compra
              </button>
            </Link>
            <button className={styles.clearButton} onClick={clearCart}>
              Limpar Carrinho
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
