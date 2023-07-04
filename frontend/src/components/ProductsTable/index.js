import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

export default function ProductsTable({ fetchProducts, deleteProduct }) {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async (productId) => {
    if (window.confirm("Jeste li sigurni?")) {
      const data = await deleteProduct(productId);
      //response from productController.js adminDeleteProduct function
      //is "product removed" when user is deleted from db
      if (data.message === "product removed") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    // const abctrl = new AbortController();
    fetchProducts()
      .then((res) => setProducts(res))
      .catch(
        (er) => dispatch(logout())
        //setProducts([
        //{
        //name: er.response.data.message
        //? er.response.data.message
        // : er.response.data,
        //},
        //])
      );
    //return () => abctrl.abort();
  }, [fetchProducts, productDeleted, dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "0 0 0 2rem",
        }}
      >
        <h2>PROIZVODI</h2>
        <button className={styles.button}>
          <Link className={styles.link} to="/admin/create-new-product">
            Kreirajte novi proizvod
          </Link>
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>#</th>
              <th>Naziv proizvoda</th>
              <th>Cijena</th>
              <th>Kategorija</th>
              <th>Uredi/Izbriši</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr className={styles.tableRow} key={idx}>
                <td>{idx + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  &nbsp;&nbsp;
                  <Link
                    className={styles.editLink}
                    to={`/admin/edit-product/${product._id}`}
                  >
                    <BiEdit style={{ height: "1.7rem", width: "1.7rem" }} />
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <IoTrashOutline
                    className={styles.icon}
                    style={{ height: "1.7rem", width: "1.7rem" }}
                    onClick={() => deleteHandler(product._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
