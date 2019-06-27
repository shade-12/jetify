import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SpotifyLogin from 'react-spotify-login';
import axios from 'axios';

const buttonText = <div><img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="login-logo"/>&nbsp;&nbsp;<span>Login with Spotify</span></div>;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    const {cookies} = this.props;
    this.state = {
      redirectToUserPage: false,
      accessToken: cookies.get('jetify_token') || null
    };
  }

  onSuccess = response => {
    let token = response.access_token;
    const {cookies} = this.props;
    cookies.set('jetify_token', token, { path: '/' });
    this.setState({ accessToken: cookies.get('jetify_token') });
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then( response => {
      let data = response.data;
      console.log("spotify data", data.id);
      let user = {
        name:  data.display_name,
        email: data.email,
        spotify_id: data.id
      };
      axios.post('/api/users', user).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
    });
    this.setState({ redirectToUserPage: true });
  };

  onFailure = response => console.error(response);

  render() {
    if(this.state.redirectToUserPage === true) {
      return <Redirect to="/users" />
    }

    return (
      <div className="login-page">
        <div className="login-page-background"></div>
        <section className="login-form">
          <h1>Welcome to Jetify</h1>
          <SpotifyLogin
            type="button"
            className="btn btn-dark"
            buttonText={buttonText}
            clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
            redirectUri={"http://localhost:3000/api/logging-in"}
            scope={"user-read-email user-read-private user-read-currently-playing user-library-modify playlist-modify-public playlist-read-collaborative playlist-read-private playlist-modify-private"}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
          />
        </section>
      </div>
    );
  }
}

export default LoginPage;