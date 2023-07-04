import styles from "./style.module.css";

export default function DiscountCode() {
  return (
    <div className={styles.discountContainer}>
      <label className={styles.textareaLabel}>
        Kod poklon bona ili popusta:
      </label>
      <div className={styles.codeContainer}>
        <input
          className={styles.input}
          type="text"
          name="discountCode"
          const="true"
          placeholder="Unesite kod"
          maxLength="160"
        ></input>
        <button className={styles.button}>OK</button>
      </div>
    </div>
  );
}
