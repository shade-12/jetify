import React from 'react';

function NavBar(props){
  return (
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <a className="navbar-brand" href="/">Jetify</a>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button type="button" className="btn btn-dark">Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

