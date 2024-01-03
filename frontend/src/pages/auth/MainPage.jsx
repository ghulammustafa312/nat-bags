import React, { useState } from "react";
import "./Main.css";
import SignUpForm from "./SignupSecondary/SignupSecondary";
import SignInForm from "./LoginSecondary/LoginSecondary";

export const LoginMain = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className={containerClass} id="container">
      <SignUpForm />
      <SignInForm />
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Step into style! Log in for exclusive access to our chic bags collection.</p>
            <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Unlock the world of trendy bags. Sign up for style delivered to your inbox!</p>
            <button className="ghost " id="signUp" onClick={() => handleOnClick("signUp")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
