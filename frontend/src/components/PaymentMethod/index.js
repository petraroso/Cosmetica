import styles from "./style.module.css";

export default function PaymentMethod({
  paymentMethod,
  disabled = false,
  choosePayment,
  isPaid,
}) {
  return (
    <div className={styles.paymentContainer}>
      <h2>METODA PLAĆANJA</h2>
      <select
        defaultValue={paymentMethod}
        disabled={disabled}
        onChange={choosePayment}
        name="paymentMethod"
      >
        <option value="pp">PayPal</option>
        <option value="cod">Pouzećem</option>
      </select>
      <div className={styles.errorAlert}>
        {isPaid ? <div>Plaćeno {isPaid}</div> : <div>Nije plaćeno.</div>}
      </div>
    </div>
  );
}
