import styles from "./style.module.css";
import { useSelector } from "react-redux";

export default function CategoryFilter({ setCategoriesFromFilter }) {
  const { categories } = useSelector((state) => state.getCategories);

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      //copy all items
      //[dynamic key]
      //e.target.checked is value for the key
      return { ...items, [category.name]: e.target.checked };
    });
  };
  return (
    <div className={styles.categoryFilterContainer}>
      <p>
        <b>Kategorija</b>
      </p>
      {categories.map((category, idx) => (
        <div key={idx}>
          <input
            className={styles.input}
            name="chosen"
            type="checkbox"
            onChange={(e) => selectCategory(e, category, idx)}
          ></input>
          {category.name}
        </div>
      ))}
    </div>
  );
}
