import styles from "./style.module.css";
import CategoryFilter from "../FiltersFolder/CategoryFilter";
import PriceFilter from "../FiltersFolder/PriceFilter";
import RatingFilter from "../FiltersFolder/RatingFilter";
import SortSelect from "../FiltersFolder/SortSelect";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";

export default function Filters({
  filters,
  setFilters,
  categories,
  sortOption,
  setSortOption,
}) {
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);

  const [price, setPrice] = useState(500);
  const [ratingsFromFilter, setRatingsFromFilter] = useState({});
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({});

  //for reading the path
  const location = useLocation();

  const handleFilters = () => {
    setShowResetFiltersButton(true);
    setFilters({
      price: price,
      rating: ratingsFromFilter,
      category: categoriesFromFilter,
    });
  };

  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setFilters({});
    window.location.href = "/product-list";
  };

  return (
    <div className={styles.filters}>
      <SortSelect setSortOption={setSortOption} />
      <PriceFilter price={price} setPrice={setPrice} />
      {!location.pathname.match(/\/category/) && (
        <CategoryFilter setCategoriesFromFilter={setCategoriesFromFilter} />
      )}
      <RatingFilter setRatingsFromFilter={setRatingsFromFilter} />
      <div className={styles.buttonsContainer}>
      <button className={styles.button}  onClick={handleFilters}>
        Filtriraj
      </button>
      {showResetFiltersButton && (
        <button className={styles.button} onClick={resetFilters}>
          Resetiraj
        </button>
      )}</div>
    </div>
  );
}
