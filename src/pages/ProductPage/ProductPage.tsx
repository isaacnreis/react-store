import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.details}>
        <h1>{product.title}</h1>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button className={styles.button} onClick={() => addToCart(product)}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
