import styles from "./style.module.css";

export default function OrderCartSummary({
  cartSubtotal,
  deliveryMethod,
  deliveryPrice,
  orderHandler,
  buttonDisabled,
  orderButtonMessage,
}) {
  return (
    <div className={styles.orderCartSummaryContainer}>
      <h2>SAŽETAK NARUDŽBE</h2>
      <div>
        <b>Ukupno košarica:&nbsp;</b>&euro;{cartSubtotal}
      </div>
      <div>
        <b>Dostava:&nbsp;</b>
        {deliveryMethod}, &euro;{deliveryPrice}
      </div>
      <h3>
        <b>UKUPNO:&nbsp;&euro;{cartSubtotal + 8}</b>
      </h3>
      {buttonDisabled ? (
        ""
      ) : (
        <button onClick={orderHandler} className={styles.button}>
          {orderButtonMessage}
        </button>
      )}
    </div>
  );
}
