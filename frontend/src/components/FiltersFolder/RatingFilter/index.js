import styles from "./style.module.css";

export default function RatingFilter({ setRatingsFromFilter }) {
  return (
    <div className={styles.ratingFilterContainer}>
      <p>
        <b>Ocjena</b>
      </p>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx}>
          <input
            className={styles.input}
            name="chosen"
            type="checkbox"
            onChange={(e) =>
              setRatingsFromFilter((items) => {
                //replacing old values
                return { ...items, [5 - idx]: e.target.checked };
              })
            }
          ></input>
          {5 - idx}
        </div>
      ))}
    </div>
  );
}
