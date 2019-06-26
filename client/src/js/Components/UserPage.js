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
      endDate: new Date(),
      eventBarPosition:'49.2,-123.1',
      eventStartDate: (new Date()).toISOString(),
      eventEndDate: (new Date()).toISOString(),
    };
  }
  

  makePositionString = () => {
    const position =
      this.state.display_lat.toString() +
      ',' +
      this.state.display_long.toString();
    return position;
  };

  setLocation = (locationObj) => {
    const lat = locationObj.mapPosition.lat;
    const lng = locationObj.mapPosition.lng;
    this.setState({
      display_lat: lat,
      display_long: lng
    });
    this.setState({
      position:this.makePositionString()
    });
  };

  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    });
  }
  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    });
  }
  onSubmit = () => {
    console.log(this.state.startDate.toISOString())
    this.setState({
      eventBarPosition: this.state.position,
      eventStartDate: this.state.startDate.toISOString(),
      eventEndDate: this.state.endDate.toISOString(),
    }); 
}

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Body">
          <EventBar
            latlong={this.state.eventBarPosition}
            startDate={this.state.eventStartDate}
            endDate={this.state.eventEndDate}
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
            <button type="onSubmit" onClick={this.onSubmit}>Submit</button>
          </div>
          <Playlist />
        </div>
      </div>
    );
  }
}

export default User;
