import styles from "./style.module.css";
import { Link } from "react-router-dom";

export default function Dropdown({ categories, dropdownRef }) {
  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownList}>
        <Link className={styles.link} to={"/product-list"}>
          <span>SVI PROIZVODI</span>
        </Link>
        {categories.map((category, idx) => (
          <Link
            key={idx}
            className={styles.link}
            to={`/product-list/category/${category.name}`}
          >
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
