import styles from "./style.module.css";
import CategoryFilter from "../FiltersFolder/CategoryFilter";
import PriceFilter from "../FiltersFolder/PriceFilter";
import RatingFilter from "../FiltersFolder/RatingFilter";
import SortSelect from "../FiltersFolder/SortSelect";
import { useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { BiFilter } from "react-icons/bi";

export default function Filters({
  filters,
  setFilters,
  categories,
  sortOption,
  setSortOption,
}) {
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [price, setPrice] = useState(500);
  const [ratingsFromFilter, setRatingsFromFilter] = useState({});
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({});

  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef);

  //for reading the path
  const location = useLocation();

  const handleFilters = () => {
    setShowResetFiltersButton(true);
    setOpenDropdown(false);
    setFilters({
      price: price,
      rating: ratingsFromFilter,
      category: categoriesFromFilter,
    });
  };

  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setOpenDropdown(false);
    setFilters({});
    window.location.href = "/product-list";
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      //Alert if clicked on outside of element
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenDropdown(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      <div>
        <button
          className={styles.filterDropdownButton}
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          Filtrirajte proizvode&nbsp;&nbsp;
          <BiFilter style={{ height: "1.7rem", width: "1.7rem" }} />
        </button>
        {openDropdown && (
          <div className={styles.filters} ref={dropdownRef}>
            <div className={styles.filtersLayout}>
              <div>
                <SortSelect setSortOption={setSortOption} />
                <PriceFilter price={price} setPrice={setPrice} />
              </div>
              {!location.pathname.match(/\/category/) && (
                <CategoryFilter
                  setCategoriesFromFilter={setCategoriesFromFilter}
                />
              )}
              <RatingFilter setRatingsFromFilter={setRatingsFromFilter} />
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.button} onClick={handleFilters}>
                Filtriraj
              </button>
              {showResetFiltersButton && (
                <button className={styles.button} onClick={resetFilters}>
                  Resetiraj
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
