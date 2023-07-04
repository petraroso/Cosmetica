import styles from "./style.module.css";
import { BiEdit } from "react-icons/bi";
import { IoCheckmark, IoClose, IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

export default function UsersTable({ fetchUsers, deleteUser }) {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  const dispatch = useDispatch();
  const deleteHandler = async (userId) => {
    if (window.confirm("Jeste li sigurni?")) {
      const data = await deleteUser(userId);
      //response from userController.js deleteUser function
      //is "user removed" when user is deleted from db
      if (data === "user removed") {
        setUserDeleted(!userDeleted);
      }
    }
  };

  useEffect(() => {
    //allows to abort one or more web requests when desired
    //const abctrl = new AbortController();
    fetchUsers()
      .then((res) => setUsers(res))
      .catch(
        (er) => dispatch(logout())
        // console.log(
        //error response doesn't always have message property
        //  er.response.data.message ? er.response.data.message : er.response.data
        //  )
      );
    //to avoid memory leakage
    //return () => abctrl.abort();
  }, [fetchUsers, userDeleted, dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.tableTitle}>KORISNICI</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>E-mail</th>
              <th>Je admin</th>
              <th>Uredi/Izbriši</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr className={styles.tableRow} key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <IoCheckmark style={{ color: "blue" }} />
                  ) : (
                    <IoClose />
                  )}
                </td>
                <td>
                  &nbsp;&nbsp;
                  <Link
                    className={styles.editLink}
                    to={`/admin/edit-user/${user._id}`}
                  >
                    <BiEdit
                      className={styles.icon}
                      style={{ height: "1.7rem", width: "1.7rem" }}
                    />
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <IoTrashOutline
                    className={styles.icon}
                    style={{ height: "1.7rem", width: "1.7rem" }}
                    onClick={() => deleteHandler(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
