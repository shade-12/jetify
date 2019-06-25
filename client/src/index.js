import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/index.scss';
import Login from './js/Components/Login'
import App from './js/App';
import * as serviceWorker from './js/serviceWorker';

const routing = (
  <Router>
    <div>
      <Route path='/' exact component={Login} />
      <Route path='/users' component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();