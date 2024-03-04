import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing/Landing";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
