import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import axios from 'axios';

import NavBar from './_Navbar.js';
import EventBar from './_Eventbar.js';
import Playlist from './_Playlist.js';
import Map from './_Map.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_city: 'Vancouver',
      display_lat: 49.2827,
      display_long: -123.1207,
      position: '49.2827,-123.1207',
      startDate: new Date(),
      endDate: new Date()
    };
  }

  makePositionString = () => {
    const position =
      this.state.display_lat.toString() +
      ',' +
      this.state.display_long.toString();
    return position;
  };

  setLocation = locationObj => {
    const lat = locationObj.mapPosition.lat;
    const lng = locationObj.mapPosition.lng;
    this.setState({
      display_lat: lat,
      display_long: lng
    });
    this.setState({
      position: this.makePositionString()
    });

    console.log('position set', this.state.display_lat);
  };

  handleChange = date => {
    this.setState({
      startDate: date,
      endDate: date
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Body">
          <EventBar
            latlong={this.makePositionString()}
            startDate={'2019-07-20T11:52:00Z'}
            endDate={'2019-07-20T17:52:00Z'}
          />
          <div className="map-container">
            <Map
              google={this.props.google}
              center={{
                lat: this.state.display_lat,
                lng: this.state.display_long
              }}
              display_city={this.state.display_city}
              height="80vh"
              zoom={2}
              setLocation={this.setLocation}
            />
            <div className="date-form">
              <h2>Select your dates:</h2>
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={this.state.startDate}
              />
            </div>
          </div>
          <Playlist />
        </div>
      </div>
    );
  }
}

export default User;
