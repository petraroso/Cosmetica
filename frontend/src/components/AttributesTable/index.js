import Attribute from "../Attribute";
import styles from "./style.module.css";

export default function AttributesTable({ attributesTable, deleteAttribute }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Atribut</th>
            <th>Vrijednost</th>
            <th>Izbrišite</th>
          </tr>
        </thead>
        <tbody>
          {attributesTable.map((item, idx) => (
            <Attribute
              key={idx}
              attribute={item.key}
              value={item.value}
              deleteAttribute={deleteAttribute}
              itemKey={item.key}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
