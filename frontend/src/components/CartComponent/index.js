import CartProductCard from "../CartProductCard";
//import DiscountCode from "../DiscountCode";
//import DeliveryMethod from "../DeliveryMethod";
//import PaymentMethod from "../PaymentMethod";
import Subtotal from "../Subtotal";
import styles from "./style.module.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CartComponent({
  addToCart,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}) {
  const navigate = useNavigate();
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Sigurno želite ukloniti proizvod iz košarice?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "2rem" }}>
      <h2>KOŠARICA</h2>
      {cartItems.length === 0 ? (
        <>
          <div className={styles.successAlert}>Vaša košarica je prazna</div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={() => navigate("/product-list")}
            >
              Istražite proizvode &nbsp;&nbsp;
              <BsFillArrowRightCircleFill
                className={styles.icon}
                style={{ height: "1.7rem", width: "1.7rem" }}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <CartProductCard
              key={idx}
              item={item}
              changeCount={changeCount}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
          <hr></hr>

          <Subtotal cartSubtotal={cartSubtotal} />
        </>
      )}
    </div>
  );
}
