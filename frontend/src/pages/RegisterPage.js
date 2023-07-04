import Register from "../components/Register";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const registerUserApiRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });
  //hardcoded dependency session storage
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "user created") window.location.href = "/user";
  return data;
};

export default function RegisterPage() {
  const reduxDispatch = useDispatch();
  return (
    <Register
      registerUserApiRequest={registerUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
}
