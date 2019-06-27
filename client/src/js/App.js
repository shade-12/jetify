import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.js';
import UserPage from './Components/UserPage.js';
import HistoryPage from './Components/HistoryPage';


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
          <Route
            path="/history"
            component={() => <HistoryPage />}
          />
        </div>
      </Router>
    );
  }
}

export default App;