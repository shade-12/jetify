import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage.js';
import UserPage from './Components/UserPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={LoginPage} />
          <Route path="/users" component={UserPage} />
        </div>
      </Router>
    );
  }
}

export default App;