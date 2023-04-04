import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import { useState } from "react";
import { getUser } from '../service/authService';
import AuthContext from './../context/AuthProvider';
import { logout } from '../service/authService';
import { useNavigate } from "react-router-dom";


const Navigationbar = () => {

  const { auth, setAuth } = useContext(AuthContext);

  const handlelogout = (e) => {
    e.preventDefault();
    setAuth('');
    logout();
    window.location.href = "login"
  }

  return (

    <nav className="pl-2 navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">MyApp</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        { !auth.username ? (
          <li className="nav-item active">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        ) : (
        <li className="nav-item active">
            {/* <Link className="nav-link" to="/logout">Logout</Link> */}
            <a href="#" className="nav-link" onClick={handlelogout}>Logout</a>
          </li>

        )}

          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>

  )
    
}

export default Navigationbar;