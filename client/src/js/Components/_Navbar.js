import React from 'react';

function NavBar(props){
  console.log(props);
  return (
    <nav className="navbar fixed-top">
      <a className="navbar-brand" href="/">Jetify</a>
      <p className="local">Your current location is set to: {props.city}</p>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button type="button" className="btn btn-dark" onClick={props.handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

