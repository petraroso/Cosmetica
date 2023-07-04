import styles from "./style.module.css";

export default function SortSelect({ setSortOption }) {
  return (
    <select
      className={styles.select}
      onChange={(e) => setSortOption(e.target.value)}
      name="sort"
    >
      <option>SORTIRAJ PO</option>
      <option value="price_1">Cijena: niža prema višoj</option>
      <option value="price_-1">Cijena: viša prema nižoj</option>
      <option value="rating_-1">Ocjena</option>
      <option value="name_1">Ime A-Z</option>
      <option value="name_-1">Ime Z-A</option>
    </select>
  );
}
