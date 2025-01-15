import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./services/AuthContext";
import "../components/styles/App.css"


function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
