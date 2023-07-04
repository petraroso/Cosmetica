import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

export default function AdminNavigation() {
  const dispatch = useDispatch();
  return (
    <div className={styles.adminNavigationContainer}>
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
      <Link
        onClick={() => dispatch(logout())}
        className={styles.link}
      >
        Odjava
      </Link>
    </div>
  );
}
