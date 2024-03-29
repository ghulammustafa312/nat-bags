import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth-services/loginService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("profile");
  const [dashboardPage, setDashboardPage] = useState("dashboard");

  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const encodedToken = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState(
    encodedToken
      ? { token: encodedToken, isAuth: true, firstName, lastName, email }
      : { token: "", isAuth: false }
  );

  const loginHandler = async (e, email, password) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      setError("");
      setLoginCredential({ email, password });
      const response = await loginService(email, password);
      if (response.status === 201) {
        setLoginLoading(false);
        toast.success(`Welcome back, ${response.data?.data?.user?.firstName}!`);
        const encodedToken = response.data?.data.access_token;
        const firstName = response.data?.data?.user?.firstName;
        const lastName = response.data?.data?.user?.lastName;
        const email = response.data?.data?.user?.email;
        const role = response?.data?.data?.user?.role || "USER";
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        setLoginCredential({ email: "", password: "" });

        setAuth({
          token: encodedToken,
          isAuth: true,
          firstName,
          lastName,
          email,
        });
        if (role == "ADMIN") navigate("/dashboard")
        else navigate(location?.state?.from.pathname || "/");
      }
    } catch (error) {
      setLoginLoading(false);
      setError(error?.response?.data?.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loginHandler,
        error,
        setError,
        loginLoading,
        setLoginLoading,
        loginCredential,
        setLoginCredential,
        setCurrentPage,
        currentPage,
        setDashboardPage,
        dashboardPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
