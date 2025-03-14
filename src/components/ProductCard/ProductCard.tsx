import { FiHeart, FiEye } from "react-icons/fi";
import styles from "./ProductCard.module.scss";
import React from "react";

interface Product {
  id: number;
  title: string;
  discount: string;
  price: number;
  oldPrice: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
        />
        <div className={styles.icons}>
          <button className={styles.iconButton}>
            <FiHeart />
          </button>
          <button className={styles.iconButton}>
            <FiEye />
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
        <div className={styles.rating}>
          {Array.from(
            { length: Math.floor(product.rating.rate) },
            (_) => "⭐"
          ).join(" ")}
          <span className={styles.reviewCount}>({product.rating.count})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
