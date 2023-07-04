import styles from "./style.module.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Subtotal({ cartSubtotal }) {
  return (
    <div className={styles.subtotalContainer}>
      <h3 className={styles.price}>UKUPNO:&nbsp;&euro;{cartSubtotal}</h3>
      <div className={styles.buttonsContainer}>
        <button
          className={cartSubtotal === 0 ? styles.disabledButton : styles.button}
        >
          Dovršite kupnju &nbsp;&nbsp;
          <BsFillArrowRightCircleFill
            className={styles.icon}
            style={{ height: "1.7rem", width: "1.7rem" }}
          />
        </button>
      </div>
    </div>
  );
}
