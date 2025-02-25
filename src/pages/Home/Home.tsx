import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar os produtos", error));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loja Virtual</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={styles.productLink}
          >
            <div className={styles.productCard}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>R$ {product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
