import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Navbar.module.scss";
import { useState } from "react";
import { FiSearch, FiShoppingCart, FiMoon, FiSun } from "react-icons/fi";
import CartModal from "../CartModal/CartModal";
import { useTheme } from "../../store/ThemeContext";

const NavBar = () => {
  const { cart, setSearchQuery } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1 className={styles.navbarTitle}>ReactStore</h1>
      </Link>

      <div className={styles.containerRight}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            onChange={onSearch}
          />
          <button className={styles.cartIcon}>
            <FiSearch size={28} className={styles.searchIcon} />
          </button>
        </div>
        <button
          className={styles.cartIcon}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <FiShoppingCart size={28} />
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </button>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "light" ? <FiMoon size={28} /> : <FiSun size={28} />}
        </button>
      </div>
      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default NavBar;
