import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductImages({ getProductDetails }) {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, getProductDetails]);

  return (
    <div className={styles.imageContainer}>
      {product.images
        ? product.images.map((image, idx) => (
            <img
              key={idx}
              id={`imageId${idx + 1}`}
              src={`${image.path ?? null}`}
              alt=""
              className={styles.image}
              crossOrigin="anonymous"
              //fluid
            ></img>
          ))
        : null}
      {error}
    </div>
  );
}
