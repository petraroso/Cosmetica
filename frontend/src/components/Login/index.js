import styles from "./style.module.css";
import { useState } from "react";
//use navigate for redirecting to another page after an action
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner11 } from "react-icons/im";

export default function Login({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) {
  const [validated, setValidated] = useState(false);
  //this state contains an object with properties
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(email, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });

          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
          }

          //redirection for regular users
          //replace: true means react deletes history of switching between pages
          //going back in browser doesn't lead back to login
          if (res.success === "user logged in" && !res.userLoggedIn.isAdmin)
            navigate("/user", { replace: true });
          //for admin
          else navigate("/admin/orders", { replace: true });
        })
        .catch((er) =>
          setLoginUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };
  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Prijava</h2>
      <form
        onSubmit={handleSubmit}
        noValidate
        validated={validated.toString()}
        className={styles.form}
      >
        <label className={styles.textareaLabel}>E-mail adresa</label>
        <input
          required
          className={styles.input}
          name="email"
          id="email"
          type="email"
          const="true"
          placeholder="Unesite E-mail adresu"
          maxLength="160"
        ></input>

        <label className={styles.textareaLabel}>Lozinka</label>
        <input
          required
          className={styles.input}
          name="password"
          id="password"
          type="password"
          const="true"
          placeholder="Unesite lozinku"
          maxLength="160"
        ></input>

        <label className={styles.logged}>
          <input name="doNotLogout" type="checkbox" id="doNotLogout"></input>
          Ostanite prijavljeni
        </label>

        <button className={styles.loginButton} type="submit">
          {loginUserResponseState && loginUserResponseState.loading === true ? (
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
      {loginUserResponseState &&
      loginUserResponseState.error === "wrong credentials" ? (
        <div className={styles.errorAlert}>Krivi korisnički podaci.</div>
      ) : (
        ""
      )}

      <div className={styles.register}>
        Nemate korisnički račun? &nbsp;
        <Link className={styles.link} to={"/register"}>
          {" "}
          Registrirajte se{" "}
        </Link>
      </div>
    </div>
  );
}
