import styles from "./style.module.css";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Reviews({ getProductDetails, productReviewed }) {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const messagesEndRef = useRef(null);
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
  }, [id, getProductDetails, productReviewed]);

  //for scrolling into view the last review made after it is posted
  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [productReviewed]);

  return (
    <div className={styles.reviewContainer}>
      <h3>RECENZIJE</h3>
      {product.reviews &&
        product.reviews.map((review, idx) => (
          <div key={idx}>
            <div className={styles.title}>
            <Rating readonly size={18} initialValue={review.rating} />
              <p className={styles.username}>{review.user.name}</p>
              <p className={styles.date}>{review.createdAt.substring(0, 10)}</p>
            </div>
            
            <p className={styles.review}>{review.comment}</p>
            <hr></hr>
          </div>
        ))}
      {error}
      <div ref={messagesEndRef} />
    </div>
  );
}
