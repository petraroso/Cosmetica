import styles from "./style.module.css";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";

export default function ProductCard({
  productId,
  name,
  description,
  price,
  images,
  rating,
  reviewsNumber,
}) {
  return (
    <Link className={styles.link} to={`/product-details/${productId}`}>
      <div className={styles.cardContainer}>
        <img
          crossOrigin="anonymous"
          src={images[0] ? images[0].path : ""}
          alt=""
          className={styles.cardImage}
        ></img>
        <div className={styles.cardBody}>
          <h4>{name}</h4>
          <p className={styles.cardDescription}>{description}</p>
          <Rating readonly size={20} initialValue={rating} /> ({reviewsNumber})
          <div>
            <b>&euro;{price}</b>
          </div>
        </div>
      </div>{" "}
    </Link>
  );
}
