import styles from "./Home.module.scss";
import ProductList from "../../components/ProductList/ProductList";
import Filters from "../../components/Filters/Filters";
import SEO from "../../components/SEO/SEO";

const Home = () => {
  return (
    <div className={styles.container}>
      <SEO
        title="React Store | Os melhores produtos para você"
        description="Encontre os melhores produtos com preços incríveis!"
      />
      <h1 className={styles.title}>Produtos</h1>
      <Filters />
      <div className={styles.productsGrid}>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
