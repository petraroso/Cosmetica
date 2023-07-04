import styles from "./style.module.css";

export default function DeliveryMethod(props) {
  return (
    <div className={styles.deliveryContainer}>
      <div className={styles.info}>
        <input className={styles.input} name="chosen" type="checkbox"></input>
        <div>
          <div className={styles.title}>{props.title}</div>
          {props.description}
        </div>
      </div>
      <div>&euro;{props.price}</div>
    </div>
  );
}
