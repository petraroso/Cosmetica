import styles from "./style.module.css";
import { useState, useEffect } from "react";

export default function UserProfile({
  updateUserApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [user, setUser] = useState({});
  const userInfo = userInfoFromRedux;

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id, fetchUser]);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      form.password.value === form.confirmPassword.value
    ) {
      //if validation is correct
      updateUserApiRequest(
        name,
        lastName,
        phoneNumber,
        address,
        country,
        zipCode,
        city,
        password
      ) //then is executed after an api request is called
        .then((data) => {
          setUpdateUserResponseState({ success: data.success, error: "" });
          reduxDispatch(
            setReduxUserState({
              doNotLogout: userInfo.doNotLogout,
              ...data.userUpdated,
            })
          );
          if (userInfo.doNotLogout)
            //then write to local storage info about user
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: true, ...data.userUpdated })
            );
          else
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify({ doNotLogout: false, ...data.userUpdated })
            );
        })
        .catch((er) =>
          setUpdateUserResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };
  return (
    <div className={styles.profileContainer}>
      <form
        className={styles.form}
        noValidate
        validated={validated.toString()}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.title}>Korisnički podaci</h2>

        <label className={styles.textareaLabel}>Vaše ime</label>
        <input
          required
          className={styles.input}
          type="text"
          name="name"
          defaultValue={user.name}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Vaše prezime</label>
        <input
          required
          className={styles.input}
          type="text"
          name="lastName"
          defaultValue={user.lastName}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>E-mail adresa</label>
        <input
          disabled
          className={styles.input}
          type="email"
          name="email"
          defaultValue={
            user.email
          }
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Telefonski broj</label>
        <input
          className={styles.input}
          type="text"
          name="phoneNumber"
          defaultValue={user.phoneNumber}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Adresa</label>
        <input
          className={styles.input}
          type="text"
          name="address"
          defaultValue={user.address}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Poštanski broj/ured</label>
        <input
          className={styles.input}
          type="text"
          name="zipCode"
          defaultValue={user.zipCode}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Grad</label>
        <input
          className={styles.input}
          type="text"
          name="city"
          defaultValue={user.city}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Država</label>
        <input
          className={styles.input}
          type="text"
          name="country"
          defaultValue={user.country}
          maxLength="160"
        ></input>
        <label className={styles.textareaLabel}>Lozinka</label>
        <input
          required
          className={passwordsMatchState ? styles.input : styles.invalidInput}
          type="password"
          name="password"
          placeholder="Lozinka"
          maxLength="160"
          minLength={6}
          onChange={onChange}
        ></input>
        <label className={styles.textareaLabel}>Ponovite lozinku</label>
        <input
          required
          className={passwordsMatchState ? styles.input : styles.invalidInput}
          type="password"
          name="confirmPassword"
          placeholder="Ponovite lozinku"
          maxLength="160"
          minLength={6}
          onChange={onChange}
        ></input>

        <button className={styles.updateButton} type="submit">
          Ažurirajte podatke
        </button>
      </form>
      {updateUserResponseState && updateUserResponseState.error !== "" ? (
        <div className={styles.errorAlert}>
          Već postoji korisnik s unesenom e-mail adresom.
        </div>
      ) : (
        ""
      )}
      {updateUserResponseState &&
      updateUserResponseState.success === "user updated" ? (
        <div className={styles.successAlert}>Uspješno ažurirani podaci.</div>
      ) : (
        ""
      )}
    </div>
  );
}
