import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarApplicant.css";

function NavbarApplicant() {
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
          <Link className="navbar-brand" to="/applicant">
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Jobs
                </a>
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

export default NavbarApplicant;
