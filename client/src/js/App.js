import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from "react-router-dom";
// import axios from 'axios';

import NavBar from './Components/Navbar.js';
import EventBar from './Components/Eventbar.js';
// import Playlist from './Components/Playlist.js';
import SideBar from './Components/Sidebar.js';
// import SpotifyWebApi from 'spotify-web-api-node';
import Map from './Components/Map.js';

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   redirectUri: 'http://localhost:3000/',
//   setAccessToken: process.env.SPOTIFY_ACCESS_TOKEN
// });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_city: 'Vancouver',
      display_lat: 49.2,
      display_long: -123.1,
      position: '49.2,-123.1'
    };
  }

  componentDidMount() {}
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
    this.setState({ display_lat: lat, display_long: lng });
    this.setState({ position: this.makePositionString() });

    console.log('position set', this.state.display_lat);
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
              height="400px"
              zoom={2}
              setLocation={this.setLocation}
            />
          </div>
          <SideBar />
        </div>
      </div>
    );
  }
}

export default App;
