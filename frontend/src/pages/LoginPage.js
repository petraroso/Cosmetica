import Login from "../components/Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  //path and input fields from request body
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  if (data.userLoggedIn.doNotLogout)
    //save data to local storage. userInfo is the key under which data will be saved
    //second argument is the value for the key
    //if the doNotLogout checkbox is checked:
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  //if the doNotLogout checkbox is not checked:
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));

  return data;
};

export default function LoginPage() {
  const reduxDispatch = useDispatch();
  return (
    <Login
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
}
