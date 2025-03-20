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
  quantity: number;
  discount?: string;
  oldPrice?: number;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const ProductPage = () => {
  const { id } = useParams();
  const { cart, updateQuantity, addToCart } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);

        const existingProduct = cart.find(
          (item) => item.id === response.data.id
        );
        if (existingProduct) {
          setCartProduct(existingProduct);
        }
      })
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id, cart]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageSection}>
        <div className={styles.thumbnailList}>
          <img src={product.image} alt={product.title} />
          <img src={product.image} alt={product.title} />
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.mainImage}>
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className={styles.detailsSection}>
        <h1>{product.title}</h1>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.actions}>
          {cartProduct ? (
            <div className={styles.quantityControl}>
              <button
                onClick={() =>
                  updateQuantity(
                    cartProduct.id,
                    Math.max(cartProduct.quantity - 1, 1)
                  )
                }
              >
                -
              </button>
              <span>{cartProduct.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(cartProduct.id, cartProduct.quantity + 1)
                }
              >
                +
              </button>
            </div>
          ) : (
            <button
              className={styles.addToCart}
              onClick={() => addToCart(product)}
            >
              Adicionar ao Carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
