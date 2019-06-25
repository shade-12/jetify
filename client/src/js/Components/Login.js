import React from 'react';
// import { Redirect, BrowserRouter } from "react-router-dom";
import SpotifyLogin from 'react-spotify-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

function Login(props) {
  return (
    <div className="login-page">
      <div className="login-page-background"></div>
      <section className="login-form">
        <h1>Welcome to Jetify</h1>
        <SpotifyLogin type="button" className="btn btn-dark"
          clientId={"7a7698ee205a4b01ac2a987c6054da8b"}
          redirectUri={"http://localhost:3000/api/logging-in"}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </section>
    </div>
  );
}

export default Login;