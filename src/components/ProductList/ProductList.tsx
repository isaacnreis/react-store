import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./ProductList.module.scss";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar os produtos", error));
  }, []);

  const { searchQuery } = useCartStore();

  // Filtrando os produtos
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filteredProducts.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className={styles.productLink}
        >
          <ProductCard key={product.id} product={product} />
        </Link>
      ))}
    </>
  );
};

export default ProductList;
