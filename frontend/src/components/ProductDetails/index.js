import styles from "./style.module.css";
import { Rating } from "react-simple-star-rating";
//thanks to use selector, we can select and read something from Redux State
//import { useDispatch, useSelector } from "react-redux";
//import { addToCart } from "../../redux/actions/cartActions";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddedToCartAlert from "../AddedToCartAlert";
import MetaComponent from "../MetaComponent";

export default function ProductDetails({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
}) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  //selector takes a callback function
  //it takes entire state as the argument and returns concrete value
  //from that state
  //const products = useSelector((state) => state.cart.value);
  //products stores the value of state: {products} to display

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, getProductDetails]);

  return (
    <>
      <MetaComponent title={product.name} description={product.description} />
      <AddedToCartAlert
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <div className={styles.detailsContainer}>
        {loading ? (
          <h3>Učitavanje detalja o proizvodu...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <>
            <div className={styles.leftColumn}>
              <h2 className={styles.cardTitle}>{product.name}</h2>
              <Rating readonly size={20} initialValue={product.rating} />(
              {product.reviewsNumber})
              <p className={styles.cardDescription}>{product.description}</p>
            </div>

            <div className={styles.rightColumn}>
              <p className={styles.status}>
                Status:&nbsp;
                {product.count > 0 ? "na zalihama" : "nedostupno"}
              </p>
              <hr></hr>
              <p>
                Cijena:&nbsp; <b>&euro;{product.price}</b>
              </p>
              <hr></hr>
              <p>Količina:</p>
              <select
                className={styles.select}
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                name="quantity"
              >
                {[...Array(product.count).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <hr></hr>
              <button onClick={addToCartHandler} className={styles.button}>
                Dodaj u košaricu
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
