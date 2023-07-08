import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category, idx }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/product-list/category/${category.name}`)}
    >
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
  );
}
