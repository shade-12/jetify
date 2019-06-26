import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.js';
import UserPage from './Components/UserPage.js';
import Spotify from 'spotify-web-api-js';
import uniq from 'lodash.uniq';
import flatten from 'lodash.flatten';
import chunk from 'lodash.chunk';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInToSpotify: false,
      accessToken: null
    }
  }

  handleLogin = (token) => {
    this.setState({
      loggedInToSpotify: true,
      accessToken: token
    });
  }

  handleLogout = () => {
    this.setState({
      loggedInToSpotify: false,
      accessToken: null
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/" exact
            component={() => <LoginPage {...this.state} handleLogin={this.handleLogin} />}
          />
          <Route
            path="/users"
            component={() => <UserPage {...this.state} handleLogout={this.handleLogout}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;