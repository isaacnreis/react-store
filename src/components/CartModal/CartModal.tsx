import { FiX } from "react-icons/fi";
import styles from "./CartModal.module.scss";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";

const CartModal = ({ onClose = () => {} }) => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartModal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX size={24} />
        </button>
        <h2>Seu Carrinho</h2>
        {cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>R$ {item.price.toFixed(2)}</p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(item.quantity - 1, 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
              <Link to="/cart">
                <button className={styles.checkoutButton} onClick={onClose}>
                  Ir para o Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
