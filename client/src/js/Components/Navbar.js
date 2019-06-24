import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

function NavBar(props){
  return (
    <Router>
      <nav className="navbar fixed-top">
        <a className="navbar-brand" href="/">Jetify</a>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/api/login"><button type="button" className="btn btn-dark">Login</button></Link>
          </li>
        </ul>
      </nav>
    </Router>
  );
}

export default NavBar;

