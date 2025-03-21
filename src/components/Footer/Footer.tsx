import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <h3>React Store</h3>
          <p>Os melhores produtos, com a melhor experiência de compra.</p>
        </div>
        <div className={styles.links}>
          <h4>Links Rápidos</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Produtos</Link>
            </li>
            <li>
              <Link to="/cart">Carrinho</Link>
            </li>
            <li>
              <Link to="/contact">Contato</Link>
            </li>
          </ul>
        </div>
        <div className={styles.social}>
          <h4>Nos Siga</h4>
          <div className={styles.icons}>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.copy}>
        © Isaac N Reis 2025 React Store. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
