import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing/Landing";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import Admin from "./Pages/Admin/Admin";
import Applicant from "./Pages/Applicant/Applicant";
import Company from "./Pages/Company/Company";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/applicant" element={<Applicant />} />
      <Route path="/company" element={<Company />} />
    </Routes>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { Route, Routes, BrowserRouter } from "react-router-dom";
// import "./App.css";
// import Landing from "./Pages/Landing/Landing";
// import Registration from "./Pages/Registration/Registration";
// import Login from "./Pages/Login/Login";
// import Admin from "./Pages/Admin/Admin";
// import Applicant from "./Pages/Applicant/Applicant";
// import Company from "./Pages/Company/Company";

// function App() {
//   const [userRole, setUserRole] = useState("free");

//   useEffect(() => {
//     const userDataString = localStorage.getItem("user");
//     const userData = JSON.parse(userDataString);
//     setUserRole(userData?.role || "free");
//   }, []);

//   const handleLogin = (role) => {
//     setUserRole(role);
//   };

//   return (
//     <div>
//       {userRole === "free" && (
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/" element={<Landing />} />
//             <Route path="/register" element={<Registration />} />
//             <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           </Routes>
//         </BrowserRouter>
//       )}
//       {userRole === "admin" && (
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/" element={<Landing />} />
//             <Route path="/register" element={<Registration />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/admin" element={<Admin />} />
//           </Routes>
//         </BrowserRouter>
//       )}
//       {userRole === "applicant" && (
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/" element={<Landing />} />
//             <Route path="/register" element={<Registration />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/applicant" element={<Applicant />} />
//           </Routes>
//         </BrowserRouter>
//       )}
//       {userRole === "company" && (
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/" element={<Landing />} />
//             <Route path="/register" element={<Registration />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/company" element={<Applicant />} />
//           </Routes>
//         </BrowserRouter>
//       )}
//     </div>
//   );
// }

// export default App;
