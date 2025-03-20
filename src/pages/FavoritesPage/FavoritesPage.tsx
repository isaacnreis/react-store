import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useFavoritesStore } from "../../store/favoritesStore";
import styles from "./FavoritesPage.module.scss";

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

const FavoritesPage = () => {
  const { favorites } = useFavoritesStore();

  return (
    <div className={styles.favoritesContainer}>
      <h1>Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Nenhum favorito adicionado ainda.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((product: Product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={styles.productLink}
            >
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
