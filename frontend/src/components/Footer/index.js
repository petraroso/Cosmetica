import styles from "./style.module.css";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div>
        <div className={styles.section}>
          <div className={styles.title}>Korisni linkovi</div>
          <div className={styles.link}>O nama</div>
          <div className={styles.link}>Uvjeti korištenja</div>
          <div className={styles.link}>Privatnost</div>
          <div className={styles.link}>Često postavljana pitanja</div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>Informacije</div>
          <div className={styles.link}>O nama</div>
          <div className={styles.link}>Uvjeti korištenja</div>
          <div className={styles.link}>Privatnost</div>
          <div className={styles.link}>Često postavljana pitanja</div>
        </div>
        <div className={styles.section}>
          <div>Kontakt:</div>
          <div className={styles.link}>
            <b>cosmetica@support.com</b>
          </div>
          <div className={styles.otherPlatforms}>Druge platforme:</div>
          <div>
            <BsInstagram className={styles.icon} />
            <FaFacebookSquare className={styles.icon} />
            <FaTiktok className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.copyright}>&copy; 2023 Cosmetica </div>
    </footer>
  );
}
