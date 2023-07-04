import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LoginPage from "../../pages/LoginPage";

//authentication is about login itself, but authorization is about access to certain pages
export default function ProtectedRoutes({ admin }) {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
      return isAuth;
    });
  }, [isAuth]);

  if (isAuth === undefined) return <LoginPage />;
  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to="/login" />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    //+ chat component for user
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
