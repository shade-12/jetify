import React, { Component } from 'react';
// import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';

import NavBar from './Components/Navbar.js';
import EventBar from './Components/Eventbar.js';
import Search from './Components/Search.js';
// import Playlist from './Components/Playlist.js';
import SideBar from './Components/Sidebar.js'
// import SpotifyWebApi from 'spotify-web-api-node';
// import MapContainer from './Components/Map.js';
// import Map from './Components/Map.js'
// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_CLIENT_ID,
//   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   redirectUri: 'http://localhost:3000/',
//   setAccessToken: process.env.SPOTIFY_ACCESS_TOKEN
// });

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
handleChange = (event) => {
this.setState({value: event.target.value});
}

onSubmit = (event) =>{
event.preventDefault();
this.setState({display_city: this.state.value});
event.target.value = "";
}

  getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        this.setState({
            display_city: data.city +", " + data.region,
            display_lat: data.latitude,
            display_long: data.longitude
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

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Body">
          <EventBar />
          <Search handleChange={this.handleChange} onSubmit={this.onSubmit} display_city={this.state.display_city} display_lat={this.state.display_lat} display_long={this.state.display_long}/>
          <SideBar />
        </div>
        {/* <Map /> */}
        {/* <div className="Map"><MapContainer display_city={this.state.display_city} /></div> */}
      </div>
    );
  }

}

export default App;