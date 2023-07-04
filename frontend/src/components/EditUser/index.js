import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser({ updateUserApiRequest, fetchUser }) {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const isAdmin = form.isAdmin.checked;
    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(id, name, lastName, email, isAdmin)
        .then((data) => {
          if (data === "user updated") {
            navigate("/admin/users");
          }
        })
        .catch((er) => {
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdminState(data.isAdmin);
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, fetchUser]);

  return (
    <div className={styles.editUserContainer}>
      <h2 className={styles.title}>Uredite korisnika</h2>
      <form
        className={styles.form}
        noValidate
        validated={validated.toString()}
        onSubmit={handleSubmit}
      >
        <label className={styles.textareaLabel}>Ime</label>
        <input
          required
          name="name"
          className={styles.input}
          type="text"
          const="true"
          defaultValue={user.name}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Prezime</label>
        <input
          required
          name="lastName"
          className={styles.input}
          type="text"
          const="true"
          defaultValue={user.lastName}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>E-mail</label>
        <input
          required
          name="email"
          className={styles.input}
          type="email"
          const="true"
          defaultValue={user.email}
          maxLength="160"
        ></input>
        <div className={styles.checkbox}>
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdminState}
            onChange={(e) => setIsAdminState(e.target.checked)}
          ></input>
          &nbsp;Je admin
        </div>
        <div>
          <button className={styles.buttonCancel}>
            <Link to="/admin/users" className={styles.link}>
              Odustanite
            </Link>
          </button>
          <button className={styles.button}>Ažurirajte</button>
          {updateUserResponseState.error}
        </div>
      </form>
    </div>
  );
}
