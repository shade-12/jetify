import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SpotifyLogin from 'react-spotify-login';
import axios from 'axios';

const buttonText = <div><img src="https://img.icons8.com/nolan/96/000000/spotify.png" alt="login-logo"/>&nbsp;&nbsp;<span>Login with Spotify</span></div>;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToUserPage: false,
      currentUser: {}
    };
  }

  onSuccess = response => {
    const {cookies} = this.props;
    //get user current location
    axios.get('https://ipapi.co/json/')
         .then(response => {
            let data = response.data;
            cookies.set('jetify_location', data, { path: '/', expires: 0 });
          })
          .catch(error => {
            console.log(error);
          });

    let token = response.access_token;
    cookies.set('jetify_token', token, { path: '/', expires: 0 });
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then( response => {
      let data = response.data;
      let user = {
        name:  data.display_name,
        email: data.email,
        spotify_id: data.id
      };
      axios.post('/api/users', user).then(response => {
        let user = response.data.user;
        cookies.set('jetify_user', user.id, { path: '/', expires: 0 });
        this.setState({
          currentUser: user,
          redirectToUserPage: true
        });
      }).catch(error => {
        console.log(error);
      });
    });
  };

  onFailure = response => console.error(response);

  render() {
    if(this.state.redirectToUserPage === true) {
      return <Redirect to={`/users/${this.state.currentUser.id}`} />
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