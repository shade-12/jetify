import React from 'react';
import SpotifyLogin from 'react-spotify-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

function SideBar(props) {
  return (
    <div className="sidebar">
      <h2>Get your playlist now!</h2>
      <button type="button" className="btn btn-dark">
        Login
      </button>
      <SpotifyLogin
        clientId={"7a7698ee205a4b01ac2a987c6054da8b"}
        redirectUri={"http://localhost:3000/api/logging-in"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default SideBar;
