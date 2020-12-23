import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to="/patients">
            Patients
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/create-patient">
            Add New Patient
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
