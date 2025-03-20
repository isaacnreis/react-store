import { FiEye } from "react-icons/fi";
import styles from "./ProductCard.module.scss";
import React from "react";
import { useFavoritesStore } from "../../store/favoritesStore";
import { LuHeart, LuHeartOff } from "react-icons/lu";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <div className={styles.card}>
      {product.discount && (
        <div className={styles.discountTag}>-{product.discount}%</div>
      )}
      <div className={styles.imageContainer}>
        <img
          className={styles.productImage}
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
        <div className={styles.icons}>
          <button className={styles.iconButton}>
            <FiEye />
          </button>
          <button
            className={styles.iconButton}
            onClick={(event) => {
              event.preventDefault();
              toggleFavorite(product);
            }}
          >
            {isFavorite(product.id) ? <LuHeartOff color="red" /> : <LuHeart />}
          </button>
        </div>
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.price}>
          <span className={styles.currentPrice}>${product.price}</span>
          {product.oldPrice && (
            <span className={styles.oldPrice}>${product.oldPrice}</span>
          )}
        </div>
        {product.rating && (
          <div className={styles.rating}>
            {Array.from(
              { length: Math.floor(product.rating.rate) },
              (_) => "⭐"
            ).join(" ")}
            <span className={styles.reviewCount}>({product.rating.count})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
