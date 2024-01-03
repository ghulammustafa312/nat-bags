import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { useData } from "../../../contexts/DataProvider";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../../services/auth-services/signupService";
function SignUpForm() {
  const { loading } = useData();

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const { setAuth, loginHandler, error, setError } = useAuth();

  const navigate = useNavigate();

  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setSignUpLoading(true);
      setError("");
      if (signupCredential.password === signupCredential.confirmPassword) {
        const response = await signupService(
          signupCredential.email,
          signupCredential.password,
          signupCredential.firstName,
          signupCredential.lastName,
          signupCredential.phoneNumber
        );
        if (response.status === 201) {
          setSignUpLoading(false);
          //   toast.success(`You 've successfully signed up, ${response?.data?.data?.firstName}` );
          navigate("/login");
        }
      }
    } catch (error) {
      setSignUpLoading(false);
      setError(error.response.data.message);
    } finally {
      setSignUpLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupCredential({
      ...signupCredential,
      [name]: value,
    });
  };
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={signupHandler}>
        <h1 style={{ marginBottom: "4rem" }}>Create Account</h1>
        {/*   <div className="social-container">
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
        <span>or use your email for registration</span>
    */}
        <input type="text" name="firstName" value={signupCredential.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={signupCredential.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={signupCredential.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={signupCredential.password} onChange={handleChange} placeholder="Password" required />
        <input
          type="password"
          name="confirmPassword"
          value={signupCredential.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <input type="text" name="phoneNumber" value={signupCredential.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        {error && <span className="error">{error}</span>}
        <button style={{ marginTop: "10px" }} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
