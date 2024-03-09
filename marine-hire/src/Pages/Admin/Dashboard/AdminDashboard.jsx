import React from "react";
import "./AdminDashboard.css";
import NavbarAdmin from "../NavbarAdmin/NavbarAdmin";

function AdminDashboard() {
  return (
    <div className="admin-page">
      <NavbarAdmin />
      <h1>Admin Dashboard</h1>
    </div>
  );
}

export default AdminDashboard;
