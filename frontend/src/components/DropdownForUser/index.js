import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function DropdownForUser({ userInfo, logout, dropdownRef }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.dropdownList}>
        <Link className={styles.link} to={"/user"}>
          <span>
            <b>{`${userInfo.name} ${userInfo.lastName}`}</b>
          </span>
        </Link>
        <hr></hr>
        <Link className={styles.link} to="/user/my-orders">
          <span>Moje narudžbe</span>
        </Link>
        <div className={styles.link} onClick={() => dispatch(logout())}>
          Odjava
        </div>
      </div>
    </div>
  );
}
