import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./ProductList.module.scss";

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

const ProductList = () => {
  const { searchQuery, categoryFilter, priceFilter } = useCartStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar os produtos", error));
  }, []);

  // Filtrando os produtos
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    const matchesPrice =
      product.price >= priceFilter.min && product.price <= priceFilter.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <>
      {filteredProducts.map((product: Product) => (
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
