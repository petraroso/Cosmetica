import styles from "./style.module.css";
import CategoryCard from "../CategoryCard";
import { useState, useEffect } from "react";

export default function CardsLayout({ categories }) {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      //sub-categories are filtered out
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <div className={styles.cardLayout}>
      {mainCategories.map((category, idx) => (
        <CategoryCard key={idx} category={category} idx={idx} />
      ))}
    </div>
  );
}
