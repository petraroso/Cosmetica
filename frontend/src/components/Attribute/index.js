import styles from "./style.module.css";

import { IoClose } from "react-icons/io5";

export default function Attribute({
  attribute,
  value,
  deleteAttribute,
  itemKey,
}) {
  return (
    <tr className={styles.tableRow}>
      <td>{attribute}</td>
      <td>{value}</td>
      <td>
        <IoClose
          className={styles.icon}
          onClick={() => deleteAttribute(itemKey)}
        />
      </td>
    </tr>
  );
}
