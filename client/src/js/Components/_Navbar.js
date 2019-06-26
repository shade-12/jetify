import React from 'react';

function NavBar(props){
  return (
    <nav className="navbar fixed-top">
      <a className="navbar-brand" href="/">Jetify</a>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <span className="username">{props.user}</span>&nbsp;&nbsp;
          <button type="button" className="btn btn-dark" onClick={props.handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

