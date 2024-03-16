import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";

function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [passwordIndicators, setPasswordIndicators] = useState({
    containsNumber: false,
    containsSymbol: false,
    lengthValid: false,
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    const containsNumber = /\d/.test(password);
    const containsSymbol = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);
    const lengthValid = password.length >= 8; // You can set your desired password length here
    setPasswordIndicators({
      containsNumber,
      containsSymbol,
      lengthValid,
    });
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const renderPasswordPopover = () => {
    const { containsNumber, containsSymbol, lengthValid } = passwordIndicators;
    if (!containsNumber || !containsSymbol || !lengthValid) {
      return (
        <div className="password-popover">
          <p>Password must contain:</p>
          <ul>
            {!containsNumber && <li>Number</li>}
            {!containsSymbol && <li>Symbol</li>}
            {!lengthValid && <li>Minimum 8 characters</li>}
          </ul>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      console.log(response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      });
      // alert("Registration successful!");
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user: " + error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="registration">
        <div className="form-div">
          <h3>Register</h3>
          <div>
            <form className="form-tag" onSubmit={handleSubmit}>
              <div className="mb-3 form-check">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="inlineRadio1"
                    value="admin"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Admin
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="inlineRadio2"
                    value="applicant"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Applicant
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="inlineRadio3"
                    value="company"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    Company
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputFirstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputFirstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputLastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputLastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div
                  className={`password-input-container ${
                    isPasswordFocused ? "focused" : ""
                  }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      !passwordIndicators.containsNumber ||
                      !passwordIndicators.containsSymbol ||
                      !passwordIndicators.lengthValid
                        ? "invalid"
                        : "valid"
                    }`}
                    id="exampleInputPassword1"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handlePasswordFocus}
                  />
                  <div
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                  {renderPasswordPopover()}
                </div>
              </div>

              <div className="form-button-div">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            <div className="login-info">
              <p>Already registered?</p>
              <Link to="/login" className="login-link">
                ‎ Login
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default Registration;
