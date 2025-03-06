import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Cart.module.scss";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  return (
    <div className={styles.container}>
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className={styles.cartList}>
          {cart.map((product) => (
            <div key={product.id} className={styles.cartItem}>
              <img src={product.image} alt={product.title} />
              <div className={styles.details}>
                <h3>{product.title}</h3>
                <p>R$ {product.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        Math.max(product.quantity - 1, 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(product.id)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
          <button className={styles.clearButton} onClick={clearCart}>
            Limpar Carrinho
          </button>
          <button className={styles.checkoutButton}>
            <Link to="/checkout">Finalizar Compra</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
