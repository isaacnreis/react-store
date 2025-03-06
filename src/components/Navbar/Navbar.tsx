import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Navbar.module.scss";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartModal from "../CartModal/CartModal";

const NavBar = () => {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1>ReactStore</h1>
      </Link>
      <div
        className={styles.cartIcon}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <FiShoppingCart size={28} />
        {totalItems > 0 && (
          <span className={styles.cartCount}>{totalItems}</span>
        )}
      </div>
      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default NavBar;
