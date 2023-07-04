import styles from "./style.module.css";

export default function DeliveryDetails({
  name,
  lastName,
  address,
  zipCode,
  city,
  country,
  phoneNumber,
  isDelivered = false,
  errorText,
  missingAddress = false,
}) {
  return (
    <div className={styles.deliveryContainer}>
      <h2>DOSTAVA</h2>
      <div>
        <b>Ime:&nbsp;</b>
        {name}&nbsp;{lastName}
      </div>
      <div>
        <b>Adresa:&nbsp;</b>
        {address},&nbsp;{zipCode}&nbsp;{city},&nbsp;{country}
      </div>
      <div>
        <b>Telefon:&nbsp;</b>
        {phoneNumber}
      </div>
      {missingAddress ? (
        <div className={styles.errorAlert}>{missingAddress}</div>
      ) : (
        ""
      )}
      {isDelivered ? (
        <div className={styles.errorAlert}>Dostavljeno {isDelivered}</div>
      ) : errorText ? (
        <div className={styles.errorAlert}>{errorText}</div>
      ) : (
        ""
      )}
    </div>
  );
}
