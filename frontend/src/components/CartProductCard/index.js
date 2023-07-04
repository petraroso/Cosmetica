import styles from "./style.module.css";
import RemoveFromCart from "../RemoveFromCart";

export default function CartProductCard({
  item,
  removeFromCartHandler = false,
  orderCreated = false,
  changeCount = false,
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageAndTitle}>
        <img
          crossOrigin="anonymous"
          src={item.image ? item.image.path ?? null : null}
          alt="slika"
          fluid="true"
          className={styles.cardImage}
        ></img>

        <h4 className={styles.cardBrand}>{item.name}</h4>
      </div>

      <div className={styles.selectAndDelete}>
        <select
          onChange={
            changeCount
              ? (e) => changeCount(item.productID, e.target.value)
              : undefined
          }
          defaultValue={item.quantity}
          disabled={orderCreated}
          name="count"
        >
          {[...Array(item.count).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
        <div>&euro;{item.price}</div>
        <RemoveFromCart
          orderCreated={orderCreated}
          productID={item.productID}
          quantity={item.quantity}
          price={item.price}
          removeFromCartHandler={
            removeFromCartHandler ? removeFromCartHandler : undefined
          }
        />
      </div>
    </div>
  );
}
