import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginPage from './Components/LoginPage.js';
import UserPage from './Components/UserPage.js';
import HistoryPage from './Components/HistoryPage';


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/" exact
            render={() => <LoginPage cookies={this.props.cookies} />}
          />
          <Route
            path="/users"
            render={() => <UserPage cookies={this.props.cookies} />}
          />
          <Route
            path="/history"
            component={() => <HistoryPage cookies={this.props.cookies}/>}
          />
        </div>
      </Router>
    );
  }
}

export default withCookies(App);