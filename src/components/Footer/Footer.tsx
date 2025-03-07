import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.scss";

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
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Produtos</a>
            </li>
            <li>
              <a href="/cart">Carrinho</a>
            </li>
            <li>
              <a href="/contact">Contato</a>
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
