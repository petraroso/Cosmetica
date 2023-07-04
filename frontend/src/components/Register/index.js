import styles from "./style.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner11 } from "react-icons/im";

export default function Register({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else setPasswordsMatchState(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      email &&
      password &&
      name &&
      lastName &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true });
      registerUserApiRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterUserResponseState({
            success: data.success,
            loading: false,
          });
          //userCreated comes from backend userController.js
          reduxDispatch(setReduxUserState(data.userCreated));
        })
        .catch((er) =>
          setRegisterUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };
  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Registracija</h2>
      <form
        className={styles.form}
        noValidate
        validated={validated.toString()}
        onSubmit={handleSubmit}
      >
        <label className={styles.textareaLabel}>Vaše ime</label>
        <input
          required
          className={styles.input}
          type="text"
          name="name"
          id="name"
          const="true"
          placeholder="Unesite Vaše ime"
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Vaše prezime</label>
        <input
          required
          className={styles.input}
          type="text"
          name="lastName"
          id="lastName"
          const="true"
          placeholder="Unesite Vaše prezime"
          maxLength="160"
        ></input>

        <label className={styles.textareaLabel}>E-mail adresa</label>
        <input
          required
          className={styles.input}
          type="email"
          name="email"
          id="email"
          const="true"
          placeholder="Unesite e-mail adresu"
          maxLength="160"
        ></input>

        <label className={styles.textareaLabel}>Lozinka</label>
        <input
          className={passwordsMatchState ? styles.input : styles.invalidInput}
          type="password"
          name="password"
          id="password"
          placeholder="Unesite lozinku"
          minLength="6"
          onChange={onChange}
        ></input>
        <label className={styles.textareaLabel}>Ponovite lozinku</label>
        <input
          //required
          className={passwordsMatchState ? styles.input : styles.invalidInput}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          const="true"
          placeholder="Ponovite lozinku"
          minLength="6"
          onChange={onChange}
        ></input>

        <label className={styles.logged}>
          <input name="doNotLogout" type="checkbox" id="doNotLogout"></input>
          Ostanite prijavljeni
        </label>

        <button className={styles.loginButton} type="submit">
          {registerUserResponseState &&
          registerUserResponseState.loading === true ? (
            <>
              <ImSpinner11 style={{ height: "1rem", width: "1rem" }} />
              &nbsp;&nbsp;
            </>
          ) : (
            ""
          )}
          Prijava
        </button>
      </form>
      <div className={styles.login}>
        Već imate korisnički račun? &nbsp;
        <Link className={styles.link} to={"/login"}>
          {" "}
          Prijava{" "}
        </Link>
      </div>
      {registerUserResponseState &&
      registerUserResponseState.error === "user exists" ? (
        <div className={styles.errorAlert}>
          Korisnik s istim e-mailom već postoji.
        </div>
      ) : (
        ""
      )}
      {registerUserResponseState &&
      registerUserResponseState.success === "user created" ? (
        <div className={styles.successAlert}>
          Uspješno kreiran korisnički račun!
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
