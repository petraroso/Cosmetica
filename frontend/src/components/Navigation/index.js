import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ categories }) {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      //sub-categories are filtered out
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <div className={styles.navigationList}>
      <Link className={styles.link} to={"/product-list"}>
        <span>SVE</span>
      </Link>
      {mainCategories.map((category, idx) => (
        <Link
          key={idx}
          className={styles.link}
          to={`/product-list/category/${category.name}`}
        >
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
