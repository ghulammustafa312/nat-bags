import React, { useState } from "react";
import { useData } from "../../../contexts/DataProvider";
import { useAuth } from "../../../contexts/AuthProvider";
function SignInForm() {
  const { loading } = useData();
  const [hidePassword, setHidePassword] = useState(true);
  const { error, loginCredential, setLoginCredential, loginHandler } = useAuth();

  const { email, password } = loginCredential;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCredential({
      ...loginCredential,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler(e, email, password);
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: "4rem" }}>Sign in</h1>
        {/*  <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
    */}
        <input type="email" placeholder="Email" name="email" value={loginCredential.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={loginCredential.password} onChange={handleChange} required />
        {error && <span className="error">{error}</span>}
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
