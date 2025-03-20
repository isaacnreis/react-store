import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import { useCartStore } from "../../store/cartStore";
import axios from "axios";

const Filters: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { categoryFilter, setCategoryFilter, priceFilter, setPriceFilter } =
    useCartStore();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  const resetFilters = () => {
    setCategoryFilter("");
    setPriceFilter(0, 1000);
  };

  return (
    <div className={styles.filtersContainer}>
      {/* Filtro por Categoria */}
      <div className={styles.filterGroup}>
        <label>Categoria:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Preço */}
      <div className={styles.filterGroup}>
        <label>Preço:</label>
        <input
          type="number"
          value={priceFilter.min}
          onChange={(e) =>
            setPriceFilter(Number(e.target.value), priceFilter.max)
          }
          placeholder="Mín"
        />
        <input
          type="number"
          value={priceFilter.max}
          onChange={(e) =>
            setPriceFilter(priceFilter.min, Number(e.target.value))
          }
          placeholder="Máx"
        />
      </div>
      <button className={styles.clearButton} onClick={resetFilters}>
        Limpar Filtros
      </button>
    </div>
  );
};

export default Filters;
