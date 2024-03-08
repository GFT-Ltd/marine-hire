import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarAdmin.css";

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("user");
    // Navigate to the home page
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar border-bottom navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            Jobs Maritime
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-applicants">
                  Applicants
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-companies">
                  Companies
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto flex-row-reverse">
              <button className="button-4" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarAdmin;
