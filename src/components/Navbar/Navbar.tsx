import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Navbar.module.scss";
import { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import CartModal from "../CartModal/CartModal";

const NavBar = () => {
  const { cart, setSearchQuery } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1>ReactStore</h1>
      </Link>
      <div className={styles.containerRight}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            onChange={onSearch}
          />
          <FiSearch className={styles.searchIcon} />
        </div>
        <div
          className={styles.cartIcon}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <FiShoppingCart size={28} />
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </div>
      </div>
      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default NavBar;
