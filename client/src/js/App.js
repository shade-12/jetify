import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';

import NavBar from './Components/Navbar.js';
import EventBar from './Components/Eventbar.js';
import Search from './Components/Search.js';
import Playlist from './Components/Playlist.js';
import SideBar from './Components/Sidebar.js';
import SpotifyWebApi from 'spotify-web-api-node';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        display_city: '',
    }
  }

  componentDidMount() {
    this.getGeoInfo();
    // this.getEvent();
    // this.getPlaylist();
  }

  getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        this.setState({
            display_city: data.city +", " + data.region
        });
    }).catch((error) => {
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

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({display_city: this.state.value});
    event.target.value = "";
  }

  // handleLogin = (event) => {
  //   axios.get('/api/login').then((response) => {
  //     console.log("Logging in ...");
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Body">
          <EventBar />
          <Search handleChange={this.handleChange} onSubmit={this.onSubmit} display_city={this.state.display_city}/>
          <SideBar />
        </div>
      </div>
    );
  }

}

export default App;