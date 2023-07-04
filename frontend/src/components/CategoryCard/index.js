import styles from "./style.module.css";
import { Link } from "react-router-dom";

export default function CategoryCard({ category, idx }) {
  return (
    <Link
      className={styles.link}
      to={`/product-list/category/${category.name}`}
    >
      <div className={styles.cardContainer}>
        <img
          src={category.image ?? null}
          alt=""
          className={styles.cardImage}
        ></img>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{category.name}</h3>
          <p className={styles.cardDescription}>{category.description}</p>

          <button className={styles.cardButton}>Istražite kategoriju</button>
        </div>
      </div>
    </Link>
  );
}
