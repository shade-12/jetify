import React from 'react';
// import { Redirect, BrowserRouter } from "react-router-dom";
import SpotifyLogin from 'react-spotify-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);
const buttonText = <div><img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="login-logo"/>&nbsp;&nbsp;<span>Login with Spotify</span></div>;

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page-background"></div>
      <section className="login-form">
        <h1>Welcome to Jetify</h1>
        <SpotifyLogin
          type="button"
          className="btn btn-dark"
          buttonText={buttonText}
          clientId={"7a7698ee205a4b01ac2a987c6054da8b"}
          redirectUri={"http://localhost:3000/api/logging-in"}
          scope={"user-read-private user-read-currently-playing user-library-modify playlist-modify-public playlist-read-collaborative playlist-read-private playlist-modify-private"}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </section>
    </div>
  );
}

export default LoginPage;