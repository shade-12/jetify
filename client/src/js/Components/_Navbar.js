import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function NavBar(props) {
    return (
      <nav className="navbar fixed-top">
        <h4 className="navbar-brand" onClick={props.handleJetify}><img className="bounce" src="https://img.icons8.com/nolan/96/000000/headphones.png" alt="navbar-logo"/>&nbsp;Jetify &nbsp;&nbsp;
          <span className="username">{props.user.name}</span>
        </h4>
        <h4 className="local"><img src="https://img.icons8.com/nolan/64/000000/marker.png" alt="marker-logo"/>&nbsp;{props.city}, {props.region}</h4>
        <ul className="nav justify-content-left">
          <li className="nav-item">
            <button type="button" className="btn btn-dark"onClick={props.handleMyPlaylists}>My Playlists</button>&nbsp;&nbsp;
            <button type="button" className="btn btn-dark" onClick={props.handleLogout}>Logout</button>
          </li>
        </ul>
        <DropdownButton id="dropdown-item-button" variant="dark" title="">
  <Dropdown.Item as="button" onClick={props.handleMyPlaylists}>My Playlists</Dropdown.Item>
  <Dropdown.Item as="button" onClick={props.handleLogout}>Logout</Dropdown.Item>
</DropdownButton>
      </nav>
    );
}

export default NavBar;
