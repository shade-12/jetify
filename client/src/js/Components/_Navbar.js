import React from 'react';

function NavBar(props) {
    return (
      <nav className="navbar fixed-top">
        <h4 className="navbar-brand" onClick={props.handleJetify}><img src="https://img.icons8.com/nolan/96/000000/headphones.png" alt="navbar-logo"/>&nbsp;Jetify &nbsp;&nbsp;
          <span className="username">{props.user.name}</span>
        </h4>
        <h4 className="local"><img src="https://img.icons8.com/nolan/64/000000/marker.png" alt="marker-logo"/>&nbsp;{props.city}</h4>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <button type="button" className="btn btn-dark" onClick={props.handleMyPlans}>My Plans</button>&nbsp;&nbsp;
            <button type="button" className="btn btn-dark"onClick={props.handleMyPlaylists}>My Playlists</button>&nbsp;&nbsp;
            <button type="button" className="btn btn-dark" onClick={props.handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar;

