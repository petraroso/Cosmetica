import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ReviewForm({
  userInfo,
  getProductDetails,
  writeReviewApiRequest,
  productReviewed,
  setProductReviewed,
}) {
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
  }, [id, getProductDetails, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === "review created") {
            setProductReviewed("Uspješno ste recenzirali proizvod!");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

  return (
    <form className={styles.reviewFormContainer} onSubmit={sendReviewHandler}>
      {!userInfo.name && (
        <div className={styles.alert}>
          Prijavite se da biste ostavili recenziju.
        </div>
      )}
      <label>Ostavite recenziju ovog proizvoda</label>
      <textarea
        className={styles.input}
        required
        disabled={!userInfo.name}
        type="text"
        name="comment"
        placeholder="Recenzija..."
        maxLength="1000"
        rows={3}
      ></textarea>
      <select
        className={styles.select}
        defaultValue={0}
        required
        disabled={!userInfo.name}
        name="rating"
      >
        <option value="">Vaša ocjena</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button
        className={styles.submitButton}
        type="submit"
        disabled={!userInfo.name}
      >
        Završite recenziju
      </button>
      {productReviewed ? "Proizvod recenziran" : ""}
      {error}
    </form>
  );
}
