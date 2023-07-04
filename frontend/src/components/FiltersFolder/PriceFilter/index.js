import styles from "./style.module.css";

export default function PriceFilter({ price, setPrice }) {
  return (
    <div className={styles.sliderContainer}>
      <p>FILTRIRAJ PO:</p>
      <p>
        <b>Cijena do:&nbsp;&euro;{price}</b>
      </p>
      <div>
        <input
          className={styles.slider}
          onChange={(e) => setPrice(e.target.value)}
          type="range"
          min={1}
          max={800}
          step={1}
          value={price}
          name="price"
        ></input>
      </div>
    </div>
  );
}
