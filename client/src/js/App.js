import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';

import NavBar from './Components/Navbar.js';
import EventBar from './Components/Eventbar.js';
import Search from './Components/Search.js';
import Playlist from './Components/Playlist.js';
import SideBar from './Components/Sidebar.js';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/',
  setAccessToken: process.env.SPOTIFY_ACCESS_TOKEN
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_city: ''
    };
  }

  componentDidMount() {
    this.getGeoInfo();
    // this.getEvent();
    // this.getPlaylist();
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ display_city: this.state.value });
    event.target.value = '';
  };

  getGeoInfo = () => {
    axios
      .get('https://ipapi.co/json/')
      .then(response => {
        let data = response.data;
        this.setState({
          display_city: data.city + ', ' + data.region
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // getPlaylist = () => {
  //   spotifyApi.searchTracks('artist:Love')
  //     .then(function(data) {
  //       console.log('Search tracks by "Love" in the artist name', data.body);
  //     }, function(err) {
  //       console.log('Something went wrong!', err);
  //     });
  // };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Body">
          <EventBar
            latlong={'54.9713082,-2.7246093'}
            startDate={'2019-07-20T11:52:00Z'}
            endDate={'2019-07-20T17:52:00Z'}
          />
          <Search
            handleChange={this.handleChange}
            onSubmit={this.onSubmit}
            display_city={this.state.display_city}
          />
          <SideBar />
        </div>
      </div>
    );
  }
}

export default App;
