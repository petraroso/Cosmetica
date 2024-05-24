import styles from "./style.module.css";
import { useEffect, useState } from "react";

function Spinner() {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 1500);
    return () => clearTimeout(timer);
  });

  return (
    showSpinner && (
      <div className={styles.prompt}>
        <div>
          <div className={styles.loader}></div>
        </div>
        <h3>Učitavanje podataka...</h3>
        <p>Stranica koristi besplatni Render.com servis</p>
      </div>
    )
  );
}

export default Spinner;
