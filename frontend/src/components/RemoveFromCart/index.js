import { IoTrashOutline } from "react-icons/io5";
import styles from "./style.module.css";

export default function RemoveFromCart({
  orderCreated,
  productID,
  quantity,
  price,
  removeFromCartHandler = false,
}) {
  return (
    <IoTrashOutline
      className={orderCreated ? styles.disabledIcon : styles.icon}
      style={{ height: "1.7rem", width: "1.7rem" }}
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    />
  );
}
