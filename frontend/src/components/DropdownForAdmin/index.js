import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function DropdownForAdmin({ userInfo, logout, dropdownRef }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownList}>
        <span className={styles.adminLink}>
          <b>Administrator</b>
        </span>
        <hr />
        <Link to="/admin/orders" className={styles.link}>
          Narudžbe
        </Link>
        <Link to="/admin/products" className={styles.link}>
          Proizvodi
        </Link>
        <Link to="/admin/users" className={styles.link}>
          Korisnici
        </Link>
        <Link to="/admin/analytics" className={styles.link}>
          Analitika
        </Link>
        <hr></hr>
        <Link onClick={() => dispatch(logout())} className={styles.link}>
          Odjava
        </Link>
      </div>
    </div>
  );
}
