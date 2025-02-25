import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Navbar.module.scss";

const NavBar = () => {
  const cartCount = useCartStore((state) => state.cart.length);

  return (
    <nav className={styles.navbar}>
      <Link to="/">Home</Link>
      <Link to="/cart">Carrinho ({cartCount})</Link>
    </nav>
  );
};

export default NavBar;
