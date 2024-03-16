// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Landing from "./Pages/Landing/Landing";
// import Registration from "./Pages/Registration/Registration";
// import Login from "./Pages/Login/Login";
// import Admin from "./Pages/Admin/Admin";
// import Applicant from "./Pages/Applicant/Applicant";
// import Company from "./Pages/Company/Company";

// function App() {
//   return (
//     <Routes>
//       <Route exact path="/" element={<Landing />} />
//       <Route path="/register" element={<Registration />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/admin" element={<Admin />} />
//       <Route path="/applicant" element={<Applicant />} />
//       <Route path="/company" element={<Company />} />
//     </Routes>
//   );
// }

// export default App;

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

// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Landing from "./Pages/Landing/Landing";
// import Registration from "./Pages/Registration/Registration";
// import Login from "./Pages/Login/Login";
// import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
// import Applicant from "./Pages/Applicant/Applicant";
// import Company from "./Pages/Company/Company";
// import Companies from "./Pages/Admin/Companies/Companies";

// // ProtectedRoute component for 'admin' role
// const ProtectedRouteAdmin = ({ element }) => {
//   const userDataString = localStorage.getItem("user");
//   const userData = JSON.parse(userDataString);
//   const role = userData?.role;
//   if (role !== "admin") {
//     return <Navigate to="/login" />;
//   }
//   return element;
// };

// // ProtectedRoute component for 'applicant' role
// const ProtectedRouteApplicant = ({ element }) => {
//   const userDataString = localStorage.getItem("user");
//   const userData = JSON.parse(userDataString);
//   const role = userData?.role;
//   if (role !== "applicant") {
//     return <Navigate to="/login" />;
//   }
//   return element;
// };

// // ProtectedRoute component for 'company' role
// const ProtectedRouteCompany = ({ element }) => {
//   const userDataString = localStorage.getItem("user");
//   const userData = JSON.parse(userDataString);
//   const role = userData?.role;
//   if (role !== "company") {
//     return <Navigate to="/login" />;
//   }
//   return element;
// };

// function App() {
//   return (
//     <Routes>
//       <Route exact path="/" element={<Landing />} />
//       <Route path="/register" element={<Registration />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/admin"
//         element={<ProtectedRouteAdmin element={<AdminDashboard />} />}
//       >
//         <Route
//           path="/admin/companies"
//           element={<ProtectedRouteAdmin element={<Companies />} />}
//         />
//       </Route>
//       <Route
//         path="/applicant"
//         element={<ProtectedRouteApplicant element={<Applicant />} />}
//       />
//       <Route
//         path="/company"
//         element={<ProtectedRouteCompany element={<Company />} />}
//       />
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import ApplicantDashboard from "./Pages/Applicant/Dashboard/ApplicantDashboard";
import CompanyDashboard from "./Pages/Company/Dashboard/CompanyDashboard";
import CompaniesPage from "./Pages/Admin/CompaniesPage/CompaniesPage";
import ApplicantsPage from "./Pages/Admin/ApplicantsPage/ApplicantsPage";
import PostedJobs from "./Pages/Company/PostedJobs/PostedJobs";
import JobDetailsPage from "./Pages/Company/PostedJobs/JobDetailsPage/JobDetailsPage";
import JobLinkDetailsPage from "./Pages/Company/PostedJobs/JobLinkDetailsPage/JobLinkDetailsPage";
import PdfUpload from "./Pages/Company/PdfUpload/PdfUpload";

// ProtectedRoute component for 'admin' role
const ProtectedRouteAdmin = ({ element }) => {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const role = userData?.role;
  if (role !== "admin") {
    return <Navigate to="/login" />;
  }
  return element;
};

// ProtectedRoute component for 'applicant' role
const ProtectedRouteApplicant = ({ element }) => {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const role = userData?.role;
  if (role !== "applicant") {
    return <Navigate to="/login" />;
  }
  return element;
};

// ProtectedRoute component for 'company' role
const ProtectedRouteCompany = ({ element }) => {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const role = userData?.role;
  if (role !== "company") {
    return <Navigate to="/login" />;
  }
  return element;
};

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={<ProtectedRouteAdmin element={<AdminDashboard />} />}
      />
      <Route
        path="/admin-companies"
        element={<ProtectedRouteAdmin element={<CompaniesPage />} />}
      />
      <Route
        path="/admin-applicants"
        element={<ProtectedRouteAdmin element={<ApplicantsPage />} />}
      />
      <Route
        path="/applicant"
        element={<ProtectedRouteApplicant element={<ApplicantDashboard />} />}
      />
      <Route
        path="/company"
        element={<ProtectedRouteCompany element={<CompanyDashboard />} />}
      />
      <Route
        path="/jobs-posted"
        element={<ProtectedRouteCompany element={<PostedJobs />} />}
      />
      <Route
        path="/job/:id"
        element={<ProtectedRouteCompany element={<JobDetailsPage />} />}
      />
      <Route
        path="/job-link/:id"
        element={<ProtectedRouteCompany element={<JobLinkDetailsPage />} />}
      />
      <Route
        path="/pdf-upload"
        element={<ProtectedRouteCompany element={<PdfUpload />} />}
      />
    </Routes>
  );
}

export default App;
