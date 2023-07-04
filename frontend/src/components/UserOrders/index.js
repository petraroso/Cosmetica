import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from "react";
//import { logout } from "../../redux/actions/userActions";
//import { useDispatch } from "react-redux";

export default function UserOrders({ getOrders }) {
  const [orders, setOrders] = useState([]);
  //const dispatch = useDispatch();
  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch(
        (er) => console.log(er)
        // console.log(
        //error response doesn't always have message property
        //to do: uncomment and fix
        // er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, [getOrders]);

  return (
    <>
      <h2 className={styles.tableTitle}>VAŠE NARUDŽBE</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>#</th>
              <th>Datum</th>
              <th>Ukupno</th>
              <th>Dostavljeno</th>
              <th>Način plaćanja</th>
              <th>Detalji narudžbe</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr className={styles.tableRow} key={idx}>
                <td>{idx + 1}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>{order.isDelivered ? <IoCheckmark /> : <IoClose />}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link
                    className={styles.link}
                    to={`/user/order-details/${order._id}`}
                  >
                    Detalji&nbsp;
                    <AiOutlineArrowRight />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
