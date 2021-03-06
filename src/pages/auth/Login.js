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
  const [inputType, setInputType] = useState("password");
  const testLogin = { email: "vishal@mail.com", password: "Rapidstore1" };

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
  };

  const togglePassword = () => {
    setInputType((inputType) =>
      inputType === "password" ? "text" : "password"
    );
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
            <div className="password-input">
              <input
                className="input-box"
                type={inputType}
                placeholder="******"
                name="password"
                maxLength="28"
                onChange={inputChange}
                value={loginFormData.password}
                required
              />
              <div
                type=""
                className="password-eye-btn"
                onClick={() => {
                  togglePassword();
                }}
              >
                <i
                  className={`fa fa-eye${
                    inputType === "password" ? "-slash" : ""
                  }`}
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>

          <div className="select-box">
            <label
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input type="checkbox" name="accept" id="accept" />
              Remember me
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>

          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setLoginFormData(testLogin);
            }}
          >
            Login as Guest
          </button>

          <Link to="/signup" className="auth-alternative">
            New on Rapid TV? Sign Up
          </Link>
        </div>
      </form>
    </main>
  );
};
