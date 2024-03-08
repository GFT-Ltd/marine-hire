// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/login",
  //       formData
  //     );
  //     console.log(response.data);
  //     // Save token to local storage or session storage
  //     localStorage.setItem("user", JSON.stringify({ ...response.data }));
  //     setFormData({
  //       email: "",
  //       password: "",
  //       role: "",
  //     });
  //     // Display success message
  //     // alert("Login successful!");

  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     // Handle error (display error message, etc.)
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      console.log(response.data);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      setFormData({
        email: "",
        password: "",
        role: "",
      });

      // Redirect to appropriate page based on the role
      switch (response.data.role) {
        case "admin":
          navigate("/admin");
          break;
        case "applicant":
          navigate("/applicant");
          break;
        case "company":
          navigate("/company");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login">
      <div className="form-div">
        <h3>Login</h3>
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
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-button-div">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <div className="login-info">
            <p>New here? </p>
            <Link to="/register" className="login-link">
              ‎ Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// function Login({ onLogin }) {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });

//   const [loginError, setLoginError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/login",
//         formData
//       );
//       console.log(response.data);

//       // Store user data in localStorage
//       localStorage.setItem("user", JSON.stringify(response.data));

//       // Update userRole state immediately after successful login
//       onLogin(response.data.role);

//       // Redirect the user based on the selected role
//       switch (response.data.role) {
//         case "admin":
//           navigate("/admin"); // Redirect to admin page
//           break;
//         case "applicant":
//           navigate("/applicant");
//           break;
//         case "company":
//           navigate("/company");
//           break;
//         default:
//           console.error("Invalid role");
//       }

//       // Clear form data
//       setFormData({
//         email: "",
//         password: "",
//         role: "",
//       });

//       // Display success message
//       // alert("Login successful!");
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setLoginError("Invalid email or password"); // Set login error message
//     }
//   };

//   return (
//     <div className="login">
//       <div className="form-div">
//         <h3>Login</h3>
//         <div>
//           <form className="form-tag" onSubmit={handleSubmit}>
//             <div className="mb-3 form-check">
//               <div className="form-check form-check-inline">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="role"
//                   id="inlineRadio1"
//                   value="admin"
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="inlineRadio1">
//                   Admin
//                 </label>
//               </div>
//               <div className="form-check form-check-inline">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="role"
//                   id="inlineRadio2"
//                   value="applicant"
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="inlineRadio2">
//                   Applicant
//                 </label>
//               </div>
//               <div className="form-check form-check-inline">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="role"
//                   id="inlineRadio3"
//                   value="company"
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="inlineRadio3">
//                   Company
//                 </label>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="exampleInputEmail1" className="form-label">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="exampleInputEmail1"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="exampleInputPassword1" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="exampleInputPassword1"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-button-div">
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </form>
//           <div className="login-info">
//             <p>New here? </p>
//             <Link to="/register" className="login-link">
//               ‎ Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
