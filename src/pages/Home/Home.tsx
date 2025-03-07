import styles from "./Home.module.scss";
import ProductList from "../../components/ProductList/ProductList";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <div className={styles.productsGrid}>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
