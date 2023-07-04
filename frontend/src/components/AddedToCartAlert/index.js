import styles from "./style.module.css";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddedToCartAlert({
  showCartMessage,
  setShowCartMessage,
}) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const goBack = () => {
    //-1 means go back to the last page the user was on
    navigate(-1);
  };
  const goToCart = () => {
    if (userInfo.name) {
      navigate("/user/cart-details");
    } else navigate("/cart");
  };
  if (showCartMessage) {
    return (
      <div className={styles.alertContainer}>
        <div className={styles.title}>
          <h3>Dodano u košaricu!</h3>
          <IoClose
            style={{ height: "1.7rem", width: "1.7rem", cursor: "pointer" }}
            onClick={() => setShowCartMessage(false)}
          />
        </div>
        <button onClick={goBack} className={styles.buttonBack}>
          Nazad
        </button>
        <button onClick={goToCart} className={styles.buttonCart}>
          Otiđite na košaricu
        </button>
      </div>
    );
  }
}
