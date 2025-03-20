import styles from "./Home.module.scss";
import ProductList from "../../components/ProductList/ProductList";
import Filters from "../../components/Filters/Filters";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <Filters />
      <div className={styles.productsGrid}>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
