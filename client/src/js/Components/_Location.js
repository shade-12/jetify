import React, { Component } from 'react';
// import axios from 'axios';
// has state - loading true or fault (starts true)
// componant did mount will make a request to the controller api action - once got events have can control them.

class Location extends Component {
  render() {

    return (
      <div className="card bg-dark text-white location-thumbnail">
        <img className="card-img" src="http://xperttrip.com/assets/img/uploads/package_tours/1393830230-NUIDZargcI9XiYDgxWAB.jpg" alt="Card image" />
        <div className="card-img-overlay">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    );
  }
}

export default Location;