import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast, useUser } from "context";
import {
  ACTION_TYPE_ERROR,
  ACTION_TYPE_SUCCESS,
  testAlphaNumericString,
} from "utils";
import "./auth.css";
import { Toast } from "components";
import { useApi } from "custom-hooks";

export const Login = () => {
  const navigate = useNavigate();

  const { postLoginDetailsApi } = useApi();

  const { toastState, toastDispatch, showToast, setShowToast } = useToast();
  const { setIsLoggedin, getToken, setGetToken } = useUser();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const inputChange = (e) => {
    const value = e.target.value;
    setLoginFormData((loginFormData) => ({
      ...loginFormData,
      [e.target.name]: value,
    }));
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();
    handleLogin(loginFormData.email, loginFormData.password);
  };

  const handleLogin = async (email, password) => {
    if (password.length < 6 || !testAlphaNumericString(password)) {
      setShowToast(true);
      toastDispatch({
        type: ACTION_TYPE_ERROR,
        payload:
          "⚠ Password should be Alpha Numeric and have minimum 6 characters.",
      });
      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    } else {
      try {
        const response = await postLoginDetailsApi(
          JSON.stringify({
            email: email,
            password: password,
          })
        );
        if (response.status === 200) {
          setIsLoggedin(true);
          toastDispatch({
            type: ACTION_TYPE_SUCCESS,
            payload: `✅ Loggedin successfully ${response.data.foundUser.firstName}. Enjoy the shows 🎉 `,
          });
          setShowToast(true);
          setTimeout(() => {
            navigate(-1);
            setShowToast(false);
          }, 1800);
          localStorage.setItem("token", response.data.encodedToken);

          setGetToken(response.data.encodedToken);
        }
      } catch (error) {
        const { status, statusText } = error?.response;

        if (status === 401 && statusText === "Unauthorized") {
          toastDispatch({
            type: ACTION_TYPE_ERROR,
            payload: "⚠ You have entered either incorrect Email or Password",
          });
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2500);
        } else if (status === 404 && statusText === "Not Found") {
          toastDispatch({
            type: ACTION_TYPE_ERROR,
            payload: "⚠ Email is not registered",
          });
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2500);
        } else {
          toastDispatch({
            type: ACTION_TYPE_ERROR,
            payload: "⚠ Something Wrong Happened",
          });
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2500);
        }
      }
    }
  };

  return (
    <main className="auth-container">
      <Toast />
      <form
        className="card-vertical signup-form"
        onSubmit={(e) => submitLoginHandler(e)}
      >
        <h3>Login</h3>

        <div className="input-group-parent">
          <div className="input-group">
            <label>Email address</label>
            <input
              className="input-box"
              type="email"
              placeholder="vishal@mail.com"
              maxLength="42"
              name="email"
              onChange={inputChange}
              value={loginFormData.email}
              required
            />
          </div>

          <div className="input-group">
            <label> Password </label>
            <input
              className="input-box"
              type="password"
              placeholder="******"
              name="password"
              maxLength="28"
              onChange={inputChange}
              value={loginFormData.password}
              required
            />
          </div>

          <div className="select-box">
            <label htmlFor="accept">
              <input type="checkbox" name="accept" />
              Remember me
            </label>
            <a className="forgot-pass" href="">
              Forgot your Password?
            </a>
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>

          <Link to="/signup" className="auth-alternative">
            New on Rapid TV? Sign Up
          </Link>
        </div>
      </form>
    </main>
  );
};
